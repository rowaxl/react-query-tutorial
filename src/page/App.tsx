import React from 'react'
import '../styles/App.css'
import Todos from '../components/Todos'

const App = () => (
  <>
    <header>
      <title>React Query Tutorial</title>
    </header>

    <main className="wrapper">
      <Todos />
    </main>
  </>
)

export default App
