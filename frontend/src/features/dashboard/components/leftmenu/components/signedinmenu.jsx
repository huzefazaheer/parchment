import { useContext } from 'react'
import { PrimaryButton } from '../../../../../components/ui/buttons/buttons'
import styles from '../menu.module.css'
import { appContext } from '../../../../../App'
import { useNavigate } from 'react-router-dom'

export default function SignedInMenu({ user }) {
  return (
    <div className={styles.menuitems}>
      <div className={styles.profile}>
        <img src="/exampleprofile.png" alt="" />
        <div className={styles.profiletext}>
          <p>{user.displayName}</p>
          <p>@{user.username}</p>
        </div>
      </div>
      <MenuItems />
    </div>
  )
}

function MenuItems() {
  const { setJwt, setUser } = useContext(appContext)
  const navigate = useNavigate()
  function logout() {
    setJwt(null)
    setUser(null)
    setJwt(localStorage.removeItem('jsonwebtoken'))
    navigate('/')
  }

  return (
    <ul className={styles.menuitems}>
      <li>
        <img src="/home.svg" alt="" />
        <p>Home</p>
      </li>
      <li>
        <img src="/chat.svg" alt="" />
        <p>Chat</p>
      </li>
      <li>
        <img src="/profile.svg" alt="" />
        <p>Profile</p>
      </li>
      <li onClick={logout}>
        <img src="/settings.svg" alt="" />
        <p>Settings</p>
      </li>
      <li>
        <PrimaryButton width="180px">Create Post</PrimaryButton>
      </li>
    </ul>
  )
}
