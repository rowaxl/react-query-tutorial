import { Todo, State } from "./hooks/useQueryTodo"

const BASE_URL = 'http://lvh.me:4000/todos'

export const fetcher = async(state: State): Promise<any> => {
  const query = state === 'all' ? '' : `?completed=${state === 'done'}`
  const res = await fetch(`${BASE_URL}/${query}`)
    .catch(err => err)

  if (Math.random() < 0.2) throw new Error('Error in fetcher')

  const result = await res.json()

  return result
}

export const mutator = 
  async(method: 'POST' | 'PUT', todo: Todo): Promise<Todo | Error> => {
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