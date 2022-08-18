import { useState, useContext, useEffect } from 'react'
import { loremIpsum } from 'lorem-ipsum'
import toast from 'react-hot-toast'
import { 
  Todo,
  useTodoQuery,
  useAddTodo,
  useUpdateTodo,
} from '../hooks/useQueryTodo'
import '../styles/Todos.css'
import { TodoFilterContext } from '../../contexts/todoFilterContext'

const Todos = () => {
  const [needFetch, setNeedFetch] = useState(false)
  const {state: filter, setState: updateFilter} = useContext(TodoFilterContext)
  const [updateError, setUpdateError] = useState<Error>()
  const { 
    data: todos,
    isLoading,
    error,
    refetch,
  } = useTodoQuery({
    filter,
    select: (data: Todo[]) => data,
    notifyOnChangeProps: 'all',
    onError: error => { 
      console.error(error)
      toast.error(error.message)
    },
    enabled: needFetch,
  })

  const createTodo = useAddTodo()
  const updateTodo = useUpdateTodo()

  const handleCreateTodo = async () => {
    // sync mutation
    createTodo.mutate({
      userId: 1,
      title: loremIpsum(),
      completed: false,
    })

    toast.success('New Todo created!')
  }

  const handleToggleComplete = async (todo: Todo) => {
    // asnyc mutation
    const result = await updateTodo.mutateAsync(todo)
      .catch(err => {
        console.error(err)
        setUpdateError(err)
        return
      })

    if (result) {
      setUpdateError(undefined)
      toast.success(`Todo ${todo.completed ? 'resumed!': 'completed!'}`)
    }
  }

  useEffect(() => {
    console.log({ needFetch })
  }, [needFetch])

  return (
    <>
      <div>
        {!needFetch &&
          <button onClick={() => setNeedFetch(true)}>
            Fetch
          </button>
        }
        {needFetch && !isLoading && !error &&
          <div>
            <div>
              <button onClick={() => refetch()}>
                Refetch
              </button>
              <button onClick={handleCreateTodo}>
                Create
              </button>
            </div>
            <div>
              <input type="radio" onChange={() => updateFilter('all')} checked={filter === 'all'} />
              <label>All</label>
              <input type="radio" onChange={() => updateFilter('undone')} checked={filter === 'undone'} />
              <label>Undone</label>
              <input type="radio" onChange={() => updateFilter('done')} checked={filter === 'done'} />
              <label>Done</label>
            </div>
          </div>
        }
      </div>

      {isLoading && needFetch && <p>Loading...</p>}

      {error && 
        <>
          <h4 style={{ color: 'red' }}>Some Error Happens! Try refetch!</h4>
          <button onClick={() => refetch()}>
            Refetch
          </button>
        </>
      }
      {updateError && <h4 style={{ color: 'red' }}>Failed to update Todo!</h4>}

      {!isLoading && todos &&
        <ul>
          {
            todos.sort((a: Todo, b: Todo) => b.id! - a.id!).map((todo: Todo) => (
              <li key={`todo-${todo.id}`} style={{ display: 'flex' }}>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => handleToggleComplete(todo)}
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
