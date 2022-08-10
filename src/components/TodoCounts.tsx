import React from 'react'
import { useCountTodo } from '../lib/hooks/useQueryTodo'

const TodoCounts = () => {
  // TODO: FilterをContext化して、カウントさせる
  const countData = useCountTodo()

  console.log('todo updated', { isLoading: countData.isLoading, data: countData.data })

  return (
    <h2>
      {`Todo Counts: ${countData.data}`}
    </h2>
  )
}

export default TodoCounts
