import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function useApp() {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState({ show: false, type: 'post' })

  useEffect(() => {
    if (localStorage.getItem('jsonwebtoken')) {
      setJwt(localStorage.getItem('jsonwebtoken'))
      const _user = jwtDecode(localStorage.getItem('jsonwebtoken'))
      setUser(_user)
    }
  }, [])

  return { jwt, setJwt, user, setUser, showModal, setShowModal }
}
