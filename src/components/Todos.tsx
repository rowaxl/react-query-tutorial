import React, { useState } from 'react'
import { loremIpsum } from 'lorem-ipsum'
import { 
  Todo,
  useTodoQuery,
  useAddTodo,
  useUpdateTodo,
} from '../lib/hooks/useQueryTodo'
import '../styles/Todos.css'

const Todos = () => {
  const [needFetch, setNeedFetch] = useState(false)
  const { 
    data: todos,
    isLoading,
    error,
  } = useTodoQuery(
    (data: Todo[]) => data,
    'all',
    needFetch
  )

  const createTodo = useAddTodo()
  const updateTodo = useUpdateTodo()

  const handleFetch = () => {
    setNeedFetch(true)
  }

  return (
    <>
      <div>
        {!needFetch && <button onClick={handleFetch}>Fetch</button>}
        {!isLoading && 
          <button 
            onClick={() => {
              createTodo.mutate({
                id: todos?.length + 1,
                userId: 1,
                title: loremIpsum(),
                completed: false,
              })
            }}
          >
            Create New
          </button>}
      </div>

      {isLoading && needFetch && <p>Loading...</p>}

      {error && <h4 style={{ color: 'red' }}>Some Error Happens!</h4>}

      {!isLoading && todos &&
        <ul>
          {
            todos.sort((a: Todo, b: Todo) => b.id - a.id).map((todo: Todo) => (
              <li key={`todo-${todo.id}`} style={{ display: 'flex' }}>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => {
                    updateTodo.mutate(todo)
                  }}
                />
                <p className={`todos ${todo.completed ? 'completed' : ''}`}>
                  {todo.title}
                </p>
              </li>
            ))
            }
        </ul>
      }
    </>
  )
}

export default Todos
