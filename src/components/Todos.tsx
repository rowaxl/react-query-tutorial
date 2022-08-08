import React from 'react'
import useFetchTodo from '../lib/hooks/useFetchTodo'

const Todos = () => {
  const { data: todos, isLoading } = useFetchTodo();

  if (isLoading) return <>Loading...</>

  return (
    <ul>
      { todos && todos.map(todo => (
        <li key={`todo-${todo.id}`}>
          {todo.title}
          <input type="checkbox" checked={todo.completed} />
        </li>
      ))}
    </ul>
  )
}

export default Todos
