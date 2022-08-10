import { InfiniteQueryObserverResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetcher, mutator } from '../fetcher'

export interface Todo {
  id?: number
  userId: number
  title: string
  completed: boolean
}

// select: data transformer
// notifyOnChange: observing changes
export const useTodoQuery = (
  select: (data: Todo[]) => any,
  notifyOnChangeProps: Array<keyof InfiniteQueryObserverResult> | 'all',
  enabled: boolean
) => 
  useQuery<Todo[], Error>(['todos'], fetcher, {
    staleTime: Infinity,
    select,
    notifyOnChangeProps,
    enabled,
  })

export const useCountTodo = (enabled: boolean) => 
  useTodoQuery((data: Todo[]) => data.length, ['data'], enabled)

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