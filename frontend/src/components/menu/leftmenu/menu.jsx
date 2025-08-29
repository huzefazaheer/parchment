import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../ui/buttons/buttons'
import styles from './menu.module.css'
import { useContext, useState } from 'react'
import { appContext } from '../../../App'
import SignedInMenu from './components/signedinmenu'
import RightMenu from '../rightmenu/menu'

export default function LeftMenu() {
  const { user, jwt } = useContext(appContext)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showRightMenu, setShowRightMenu] = useState(false)

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
    <div className={`${styles.menu} ${showMenu ? styles.active : ''}`}>
      <header className={styles.title}>
        <img
          onClick={() => {
            setShowMenu((prev) => !prev)
            if (showRightMenu) setShowRightMenu(false)
          }}
          src="/hamburger.svg"
          className={styles.hamburger}
        ></img>
        Parchment
        <img
          onClick={() => {
            setShowRightMenu((prev) => !prev)
            if (showMenu) setShowMenu(false)
          }}
          className={styles.search}
          src={showRightMenu ? '/cross_red.svg' : '/search.svg'}
          alt=""
        />
      </header>
      <div
        className={`${styles.submenu2} ${showRightMenu ? styles.active : ''}`}
      >
        <RightMenu />
      </div>
      {jwt == null ? (
        <div className={`${styles.submenu} ${showMenu ? styles.active : ''}`}>
          {calltoaction}
        </div>
      ) : (
        <div className={`${styles.submenu} ${showMenu ? styles.active : ''}`}>
          <SignedInMenu user={user} />
        </div>
      )}
    </div>
  )
}
