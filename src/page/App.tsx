import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { State } from '../libs/todos/hooks/useQueryTodo'
import Providers from '../libs/contexts'
import Todos from '../libs/todos/components/Todos'
import TodoCounts from '../libs/todos/components/TodoCounts'
import '../styles/App.css'

const App = () => {
  const [todoFilter, setTodoFilter] = useState<State>('undone')

  return (
    <Providers initialValues={{
      state: todoFilter,
      setState: setTodoFilter
    }}>
      <main className="wrapper">
        <TodoCounts />
        <Todos />
        <Toaster />
      </main>
    </Providers>
  )
}

export default App
