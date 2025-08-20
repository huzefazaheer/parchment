import { useNavigate } from 'react-router-dom'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import styles from './menu.module.css'
import { useContext } from 'react'
import { appContext } from '../../../../App'

export default function LeftMenu() {
  const { jwt } = useContext(appContext)
  const navigate = useNavigate()
  return (
    <div className={styles.menu}>
      <header className={styles.title}>Parchment</header>

      <div
        className={`${styles.calltoaction} ${jwt != null ? styles.hidden : ''}`}
      >
        <h2 className={styles.actionheading}>Hear the news, as it happens</h2>
        <SecondaryButton onClick={() => navigate('/signup')}>
          Create Account
        </SecondaryButton>
        <PrimaryButton onClick={() => navigate('/login')}>
          Sign in
        </PrimaryButton>
      </div>

      <div
        className={`${styles.menuitems} ${jwt == null ? styles.hidden : ''}`}
      >
        <div className={styles.profile}>
          <img src="/exampleprofile.png" alt="" />
          <div className={styles.profiletext}>
            <p>John Doe</p>
            <p>@example user</p>
          </div>
        </div>
        <MenuItems />
      </div>
    </div>
  )
}

function MenuItems() {
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
      <li>
        <img src="/settings.svg" alt="" />
        <p>Settings</p>
      </li>
    </ul>
  )
}
