import { useNavigate } from 'react-router-dom'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import styles from './menu.module.css'

export default function LeftMenu() {
  const navigate = useNavigate()
  return (
    <div className={styles.menu}>
      <header className={styles.title}>Parchment</header>
      <div className={styles.calltoaction}>
        <h2 className={styles.actionheading}>Hear the news, as it happens</h2>
        <SecondaryButton onClick={() => navigate('/signup')}>
          Create Account
        </SecondaryButton>
        <PrimaryButton onClick={() => navigate('/login')}>
          Sign in
        </PrimaryButton>
      </div>
    </div>
  )
}
