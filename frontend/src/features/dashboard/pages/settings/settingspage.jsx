import { useContext, useState } from 'react'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './settings.module.css'
import { appContext } from '../../../../App'
import Setting, { SettingAction } from '../../components/setting/setting'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const { user } = useContext(appContext)
  const [index, setIndex] = useState(null)
  const { setJwt, setUser } = useContext(appContext)
  const navigate = useNavigate()

  function toggleSetting(num) {
    if (index == num) setIndex(null)
    else setIndex(num)
  }

  function logout(e) {
    e.stopPropagation()
    navigate('/')
    setJwt(null)
    setUser(null)
    localStorage.removeItem('jsonwebtoken')
  }

  return (
    <>
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.posts}>
          <div className={styles.topheading}>
            <h4>Settings</h4>
          </div>
          <div className={styles.userprofile}>
            <img src={user.photo} alt="" />
            <p className={styles.displayname}>{user.displayName}</p>
            <p className={styles.username}>@{user.username}</p>
          </div>
          <div>
            <div onClick={() => toggleSetting(0)}>
              <Setting
                name={'Account Settings'}
                icon={'/account.svg'}
                isActive={index == 0}
              >
                <SettingAction name={'Logout'} clickfn={logout} />
              </Setting>
            </div>
            <div onClick={() => toggleSetting(1)}>
              <Setting
                name={'Privacy and Security'}
                icon={'/security.svg'}
                isActive={index == 1}
              />
            </div>
            <div onClick={() => toggleSetting(2)}>
              <Setting
                name={'Accessibility'}
                icon={'/accessibility.svg'}
                isActive={index == 2}
              />
            </div>
          </div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
