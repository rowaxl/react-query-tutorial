import { InfiniteQueryObserverResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetcher, mutator } from '../fetcher'

export interface Todo {
  id?: number
  userId: number
  title: string
  completed: boolean
}

export type State = 'all' | 'undone' | 'done'

interface UseTodoQueryProps<T> {
  filter: State
  select: (data: Todo[]) => T
  notifyOnChangeProps: Array<keyof InfiniteQueryObserverResult> | 'all'
  enabled: boolean
}

// select: data transformer
// notifyOnChange: observing changes
export const useTodoQuery = <T = Todo[]>({
  filter,
  select,
  notifyOnChangeProps,
  enabled
}: UseTodoQueryProps<T>) => 
  useQuery<Todo[], Error, T>(['todos', filter], () => fetcher(filter), {
    staleTime: Infinity,
    select,
    notifyOnChangeProps,
    enabled,
  })

export const useCountTodo = (enabled: boolean) => 
  useTodoQuery<number>({
    filter: 'all',
    select: (data: Todo[]) => data.length, 
    notifyOnChangeProps: ['data'],
    enabled
  })

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (newTodo: Todo) => mutator('POST', newTodo),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['todos'])
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
