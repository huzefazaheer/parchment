import { useContext, useState } from 'react'
import { PrimaryButton } from '../../../ui/buttons/buttons'
import styles from '../menu.module.css'
import { appContext } from '../../../../App'
import { useNavigate } from 'react-router-dom'

export default function SignedInMenu({ user }) {
  return (
    <div className={styles.menuitems}>
      <div className={styles.profile}>
        <img src={user.photo} alt="" />
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
  const [index, setIndex] = useState(0)
  const { setJwt, setUser, setShowModal } = useContext(appContext)
  const navigate = useNavigate()

  function home() {
    setIndex(0)
    navigate('/')
  }

  function profile() {
    setIndex(2)
    navigate('/profile')
  }

  function chats() {
    setIndex(1)
    navigate('/chats')
  }

  function settings() {
    setIndex(3)
    navigate('/settings')
  }

  return (
    <ul className={styles.menuitems}>
      <li onClick={home} className={`${index == 0 ? styles.active : ''}`}>
        <img src="/home.svg" alt="" />
        <p>Home</p>
      </li>
      <li onClick={chats} className={`${index == 1 ? styles.active : ''}`}>
        <img src="/chat.svg" alt="" />
        <p>Chat</p>
      </li>
      <li onClick={profile} className={`${index == 2 ? styles.active : ''}`}>
        <img src="/profile.svg" alt="" />
        <p>Profile</p>
      </li>
      <li onClick={settings} className={`${index == 3 ? styles.active : ''}`}>
        <img src="/settings.svg" alt="" />
        <p>Settings</p>
      </li>
      <li>
        <PrimaryButton
          onClick={() => setShowModal({ show: true, type: 'post' })}
          width="180px"
        >
          Create Post
        </PrimaryButton>
      </li>
    </ul>
  )
}
