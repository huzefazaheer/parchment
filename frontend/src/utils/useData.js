import { useContext, useState } from 'react'
import { appContext } from '../App'

export default function useData(endpoint, method, body = {}) {
  const { jwt } = useContext(appContext)

  const api = 'http://localhost:8080'

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchData(_endpoint = endpoint, _body = body) {
    setLoading(true)
    try {
      const res = await fetch(api + _endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
        body: JSON.stringify(_body),
      })
      const data = await res.json()
      setData(data)
      return data
    } catch (error) {
      setError(error)
    }
    setLoading(false)
    setError(null)
  }

  return { data, loading, error, fetchData }
}
