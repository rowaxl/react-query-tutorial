import React from 'react'
import { useCountTodo } from '../lib/hooks/useFetchTodo'

const TodoCounts = () => {
  const countData = useCountTodo(false)

  console.log('todo updated', { isLoading: countData.isLoading, data: countData.data })

  return (
    <h2>
      {
        countData &&
        `Counts: ${countData.data}`
      }
    </h2>
  )
}

export default TodoCounts
