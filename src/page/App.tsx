import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/App.css'
import Providers from '../lib/context'
import Todos from '../components/Todos'
import TodoCounts from '../components/TodoCounts'
import { State } from '../lib/hooks/useQueryTodo'

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
