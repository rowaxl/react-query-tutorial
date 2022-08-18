import React from 'react'
import { State } from '../todos/hooks/useQueryTodo'
import { TodoFilterContext } from "./todoFilterContext"

interface ProviderInitialValues {
  initialValues: {
    state: State,
    setState: (state: State) => void
  }
}

const Providers = (
  { children, initialValues }: React.PropsWithChildren & ProviderInitialValues
) => (
    <TodoFilterContext.Provider value={initialValues}>
      {children}
    </TodoFilterContext.Provider>
)

export default Providers
