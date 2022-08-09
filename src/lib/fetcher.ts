import { Todo } from "./hooks/useQueryTodo"

const BASE_URL = 'http://lvh.me:4000/todos'

export const fetcher = async(): Promise<any> => {
  const res = await fetch(BASE_URL)
    .catch(err => err)
  return await res.json()
}

export const mutator = async(method: 'POST' | 'PUT', todo: Todo) => {
  const url = method === 'POST' ? BASE_URL : BASE_URL + `/${todo.id}`
  const res = await fetch(url, { 
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .catch(err => err)

  return await res.json()
}