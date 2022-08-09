import React, { useState } from 'react'
import useTodoQuery, { Todo } from '../lib/hooks/useFetchTodo'
import '../styles/Todos.css'

const Todos = () => {
  const [needFetch, setNeedFetch] = useState(false)
  const { data: todos, isLoading } = useTodoQuery(
    (data: Todo[]) => data,
    'all',
    needFetch
  );

  const handleFetch = () => {
    setNeedFetch(true)
  }

  return (
    <>
      <div>
        {!needFetch && <button onClick={handleFetch}>Fetch</button>}
      </div>

      {isLoading
        ? <p>Loading</p>
        : <ul>
          {todos && todos.map((todo: Todo) => (
            <li key={`todo-${todo.id}`}>
              <p className={`todos ${todo.completed ? 'completed' : ''}`}>
                {todo.title}
              </p>
            </li>
          ))}
      </ul>
      }
    </>
  )
}

export default Todos
