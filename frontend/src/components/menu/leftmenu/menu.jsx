import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../ui/buttons/buttons'
import styles from './menu.module.css'
import { useContext } from 'react'
import { appContext } from '../../../App'
import SignedInMenu from './components/signedinmenu'

export default function LeftMenu() {
  const { user } = useContext(appContext)
  const navigate = useNavigate()

  const calltoaction = (
    <div className={styles.calltoaction}>
      <h2 className={styles.actionheading}>Hear the news, as it happens</h2>
      <SecondaryButton onClick={() => navigate('/signup')}>
        Create Account
      </SecondaryButton>
      <PrimaryButton onClick={() => navigate('/login')}>Sign in</PrimaryButton>
    </div>
  )

  return (
    <div className={styles.menu}>
      <header className={styles.title}>Parchment</header>
      {user == null ? calltoaction : <SignedInMenu user={user} />}
    </div>
  )
}
