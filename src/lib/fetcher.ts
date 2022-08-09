const fetcher = async(): Promise<any> => {
  try {
    const res = await fetch('http://lvh.me:4000/todos')
    return await res.json()
  } catch (err) {
    return err
  }
}

export default fetcher
