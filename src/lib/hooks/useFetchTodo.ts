import { useQuery } from '@tanstack/react-query'
import fetcher from '../fetcher'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

// select: data transformer
// notifyOnChange: observing changes
const useTodoQuery = (select: any, notifyOnChangeProps: any) => 
  useQuery(['todos'], fetcher, {
    staleTime: Infinity,
    select,
    notifyOnChangeProps,
  })

export const useCountTodo = () => useTodoQuery((data: Todo[]) => data.length, ['data'])

export default useTodoQuery
