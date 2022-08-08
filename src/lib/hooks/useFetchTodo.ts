import { useQuery } from '@tanstack/react-query'
import fetcher from '../fetcher'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const useFetchTodo = () => 
  useQuery<Todo[]>(['todos'], fetcher, {
    staleTime: Infinity,
  })

export default useFetchTodo
