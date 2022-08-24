import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { renderHook } from '@testing-library/react-hooks'
import { 
  useTodoQuery,
  useCountTodo,
} from './useQueryTodo'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const createWrapper = () => ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

test('test useCustomHook', async () => {
  const useCustomHook = () => useQuery(['customHook'], () => 'Hello')

  const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper: createWrapper() })

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual('Hello')
})

describe('test useQueryTodo', () => {
  test('test useTodoQuery', async () => {
    const { result, waitFor } = renderHook(() => useTodoQuery({ filter: 'all' }), { wrapper: createWrapper() })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).not.toBeNull()
  })

  test('test useCountTodo', async () => {
    const { result: todoQueryResult, waitFor: waitTodoQuery } = renderHook(() => useTodoQuery({ filter: 'all' }), { wrapper: createWrapper() })
    const { result: todoCountResult, waitFor: waitCountQuery } = renderHook(() => useCountTodo('all'), { wrapper: createWrapper() })

    await waitTodoQuery(() => todoQueryResult.current.isSuccess)
    await waitCountQuery(() => todoCountResult.current.isSuccess)

    expect(todoQueryResult.current.data.length).toEqual(todoCountResult.current.data)
  })
})