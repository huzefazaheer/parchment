import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function useApp() {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('jsonwebtoken')) {
      setJwt(localStorage.getItem('jsonwebtoken'))
    }
  }, [])

  useEffect(() => {
    if (jwt != null) {
      const _user = jwtDecode(jwt)
      setUser(_user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])

  return { jwt, setJwt, user }
}
