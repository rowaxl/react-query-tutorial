import { useContext} from 'react'
import { useCountTodo } from '../lib/hooks/useQueryTodo'
import { TodoFilterContext } from '../lib/context/todoFilterContext'

const TodoCounts = () => {
  const { state: filter } = useContext(TodoFilterContext)
  const countData = useCountTodo(filter)

  console.log('todo updated', { isLoading: countData.isLoading, data: countData.data })

  return (
    <h2>
      {`${filter.toUpperCase()} Todo Counts: ${countData.data}`}
    </h2>
  )
}

export default TodoCounts
