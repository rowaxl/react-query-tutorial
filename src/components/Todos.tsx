import React from 'react'
import useTodoQuery, { Todo } from '../lib/hooks/useFetchTodo'
import '../styles/Todos.css'

const Todos = () => {
  const { data: todos, isLoading } = useTodoQuery((data: Todo[]) => data, 'all');

  if (isLoading) return <>Loading...</>

  return (
    <ul>
      { todos && todos.map((todo: Todo) => (
        <li key={`todo-${todo.id}`}>
          <p className={`todos ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default Todos
