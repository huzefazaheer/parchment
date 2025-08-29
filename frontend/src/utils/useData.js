import { useContext, useState } from 'react'
import { appContext } from '../App'

export default function useData(endpoint, method, body = {}) {
  const { jwt } = useContext(appContext)

  const api = 'https://parchment-wd2p.onrender.com'

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchData(_endpoint = endpoint, _body = body, _jwt = jwt) {
    setLoading(true)
    try {
      const res = await fetch(api + _endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + _jwt,
        },
        body:
          Object.keys(_body).length === 0 ? undefined : JSON.stringify(_body),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data)
        setLoading(false)
        return data
      }
      setData(data)
      setLoading(false)
      setError(null)
      return data
    } catch (error) {
      setError(error)
      return error
    }
  }

  return { data, loading, error, fetchData }
}
