import { useContext, useState } from 'react'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './settings.module.css'
import { appContext } from '../../../../App'
import Setting, { SettingAction } from '../../components/setting/setting'
import { useNavigate } from 'react-router-dom'
import { TextInputField } from '../../../../components/ui/inputfield/textinputfield'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { PasswordInputField } from '../../../../components/ui/inputfield/passwordinputfield'
import useData from '../../../../utils/useData'
import checkPassword from './checkpass'

export default function SettingsPage() {
  const { user } = useContext(appContext)
  const [index, setIndex] = useState(null)
  const { setJwt, setUser } = useContext(appContext)
  const [openPass, setOpenPass] = useState(false)
  const [password, setPassword] = useState({
    oldpassword: '',
    newpassword: '',
    error: '',
  })
  const navigate = useNavigate()
  const updatePasswordFetch = useData('/auth/update', 'POST', password)

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

  async function updatePassword() {
    const passwordError = checkPassword(
      password.oldpassword,
      password.newpassword,
    )
    if (passwordError == true) {
      const data = await updatePasswordFetch.fetchData()
      if (data.error == 'UNAUTHORIZED')
        setPassword({ ...password, error: 'Invalid password' })
    } else setPassword({ ...password, error: passwordError })
  }

  return (
    <>
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.profile}>
          <div className={styles.topheading}>
            <h4>Settings</h4>
          </div>
          <div className={styles.userprofile}>
            {user.photo ? (
              <img src={user.photo} alt="" />
            ) : (
              <div className={styles.photoskeleton}></div>
            )}
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
              >
                <SettingAction
                  name={'Change Password'}
                  clickfn={() => setOpenPass((prev) => !prev)}
                >
                  {openPass ? (
                    <div className={styles.changepass}>
                      <PasswordInputField
                        label={'Old password'}
                        value={password.oldpassword}
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            oldpassword: e.target.value,
                          })
                        }
                      />
                      <PasswordInputField
                        label={'New password'}
                        value={password.newpassword}
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            newpassword: e.target.value,
                          })
                        }
                      />
                      <p>{password.error}</p>
                      <SecondaryButton onClick={updatePassword} width="100%">
                        Update
                      </SecondaryButton>
                    </div>
                  ) : (
                    ''
                  )}
                </SettingAction>
              </Setting>
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
