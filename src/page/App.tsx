import React from 'react'
import '../styles/App.css'
import Todos from '../components/Todos'
import TodoCounts from '../components/TodoCounts'

const App = () => (
  <>
    <main className="wrapper">
      <TodoCounts />
      <Todos />
    </main>
  </>
)

export default App
