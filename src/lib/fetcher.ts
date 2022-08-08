const fetcher = async(): Promise<any> => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    return await res.json()
  } catch (err) {
    return err
  }
}

export default fetcher
