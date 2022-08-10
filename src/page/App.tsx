import React from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/App.css'
import Todos from '../components/Todos'
import TodoCounts from '../components/TodoCounts'

const App = () => (
  <>
    <main className="wrapper">
      <TodoCounts />
      <Todos />
      <Toaster />
    </main>
  </>
)

export default App
