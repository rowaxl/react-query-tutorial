import { 
  useQuery,
  useMutation,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query'
import { fetcher, mutator } from '../../fetcher'

export interface Todo {
  id?: number
  userId: number
  title: string
  completed: boolean
}

export type State = 'all' | 'undone' | 'done'

interface UseTodoQueryProps<TData> {
  filter: State
  select: (data: Todo[]) => TData
  notifyOnChangeProps: Array<keyof QueryObserverResult> | 'all'
  onError?: (error: Error) => void
  enabled: boolean
  initialData?: Todo[] | (() => Todo[]);
}

// select: data transformer
// notifyOnChange: observing changes
export const useTodoQuery = <TData>({
  filter,
  select,
  notifyOnChangeProps,
  onError,
  enabled,
  initialData,
}: UseTodoQueryProps<TData>) => 
  useQuery<Todo[], Error, TData>(
    ['todos', filter],
    () => fetcher(filter),
    {
      staleTime: 0,
      select,
      notifyOnChangeProps,
      enabled,
      onError,
      initialData,
    })

export const useCountTodo = (filter: State) => 
  useTodoQuery<number>({
    filter,
    select: (data: Todo[]) => data.length,
    notifyOnChangeProps: ['data'],
    enabled: false,
    initialData: []
  })

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (newTodo: Todo) => mutator('POST', newTodo),
    {
      onMutate: async(variables) => {
        // Cancel current queries for the todos list
        await queryClient.cancelQueries(['todos'])

        const optimisticTodo = { ...variables }

        // obtimistic rerender
        queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => old && [...old, optimisticTodo])

        return { optimisticTodo }
      },
      onSuccess: (result, variables, context) => {
        if (result instanceof Error) throw result

        // Replace optimisticTodo to the result
        queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => old && old.map(todo => todo.id === context?.optimisticTodo.id ? result : todo))
      },
      onError: async (error, variable, context) => {
        console.log('on Error')
        await new Promise(res => setTimeout(res, 3000))
        console.log('rollback')
        // Remove optimistic todo from the todos list
        queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => old && old.filter(todo => todo.id !== context?.optimisticTodo.id))
      },
      onSettled: () => {
        queryClient.invalidateQueries(['todos'])
      },
      retry: 0,
    }
  )
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (updatedTodo: Todo) => mutator('PUT', { ...updatedTodo, completed: !updatedTodo.completed }),
    {
      onMutate: async(variables) => {
        // Cancel current queries for the todos list
        await queryClient.cancelQueries(['todos'])

        const optimisticTodo = { ...variables }

        // obtimistic rerender
        queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => {
          if (!old) return

          const targetIndex = old.findIndex(todo => todo.id === optimisticTodo.id)

          return [...old.slice(0, targetIndex), optimisticTodo, ...old.slice(targetIndex + 1)]
        })

        return { optimisticTodo }
      },
      onSuccess: (result, variables, context) => {
        if (result instanceof Error) throw result

        // Replace optimisticTodo to the result
        queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => old && old.map(todo => todo.id === context?.optimisticTodo.id ? result : todo))
      },
      onError: async (error, variable, context) => {
        console.log('on Error')
        await new Promise(res => setTimeout(res, 3000))
        console.log('do rollback')
        // return todos list before updating
        queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => old)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['todos'])
      },
    }
  )
}
