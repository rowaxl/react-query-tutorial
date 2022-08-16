import { 
  useQuery,
  useMutation,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query'
import { fetcher, mutator } from '../fetcher'

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
      staleTime: Infinity,
      select,
      notifyOnChangeProps,
      enabled,
      onError,
      initialData,
    })

export const useCountTodo = () => 
  useTodoQuery<number>({
    filter: 'all',
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
      // onSuccess: () => {
        // refetch
        // queryClient.invalidateQueries(['todos'])

        // update view directly
        // queryClient.setQueryData(['todos'])
      // },
      onError: () => {
        // Do rollback here
        // mutator('DELETE', newTodo)
        queryClient.invalidateQueries(['todos'])
      },
      onSettled: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (updatedTodo: Todo) => mutator('PUT', { ...updatedTodo, completed: !updatedTodo.completed }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['todos']),
    }
  )
}
