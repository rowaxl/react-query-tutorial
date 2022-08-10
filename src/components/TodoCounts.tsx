import React from 'react'
import { useCountTodo } from '../lib/hooks/useQueryTodo'

const TodoCounts = () => {
  const countData = useCountTodo(false)

  console.log('todo updated', { isLoading: countData.isLoading, data: countData.data })

  return (
    <h2>
      {
        countData.data &&
        `Todo Counts: ${countData.data}`
      }
    </h2>
  )
}

export default TodoCounts
