import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import useData from './useData'
import { useContext } from 'react'
import { socketContext } from '../App'

export default function useApp() {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState({ photo: '', displayName: '', username: '' })
  const [showModal, setShowModal] = useState({ show: false, type: 'post' })
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showRequestsModal, setShowRequestsModal] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('jsonwebtoken')) {
      setJwt(localStorage.getItem('jsonwebtoken'))
      const _user = jwtDecode(localStorage.getItem('jsonwebtoken'))
      setUser(_user)
    }
  }, [jwt])

  const jwtFetch = useData('/auth/update', 'GET')
  async function updateJwt() {
    const { data } = await jwtFetch.fetchData(undefined, undefined, jwt)
    localStorage.setItem('jsonwebtoken', data)
    setJwt(data)
  }

  return {
    jwt,
    setJwt,
    user,
    setUser,
    showModal,
    setShowModal,
    updateJwt,
    setShowEditProfileModal,
    showEditProfileModal,
    setShowRequestsModal,
    showRequestsModal,
  }
}
