import { InfiniteQueryObserverResult, useQuery } from '@tanstack/react-query'
import fetcher from '../fetcher'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

// select: data transformer
// notifyOnChange: observing changes
const useTodoQuery = (
  select: (data: Todo[]) => any,
  notifyOnChangeProps: Array<keyof InfiniteQueryObserverResult> | 'all',
  enabled: boolean
) => 
  useQuery(['todos'], fetcher, {
    staleTime: Infinity,
    select,
    notifyOnChangeProps,
    enabled,
  })

export const useCountTodo = (enabled: boolean) => 
  useTodoQuery((data: Todo[]) => data.length, ['data'], enabled)

export default useTodoQuery
