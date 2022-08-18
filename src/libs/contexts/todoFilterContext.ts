import { createContext } from 'react'
import { State } from '../todos/hooks/useQueryTodo'

export const initialFilterContext = 'undone'
export const TodoFilterContext = createContext<{ state: State, setState: (state: State) => void}>({
  state: initialFilterContext,
  setState: () => {}
})
