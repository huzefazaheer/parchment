import styles from './login.module.css'

import { useContext, useState } from 'react'
import { PrimaryButton } from '../../../../components/ui/buttons/buttons'
import { Link, useNavigate } from 'react-router-dom'
import { EmailInputField } from '../../../../components/ui/inputfield/emailinputfield'
import { PasswordInputField } from '../../../../components/ui/inputfield/passwordinputfield'
import useData from '../../../../utils/useData'
import { appContext } from '../../../../App'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const loginFetch = useData('/auth/login/email', 'POST', formData)
  const { setJwt } = useContext(appContext)
  const navigate = useNavigate()

  async function handleLogin() {
    const data = await loginFetch.fetchData()
    if (data.success) {
      setJwt(data.data)
      localStorage.setItem('jsonwebtoken', data.data)
      navigate('/')
    } else {
      setError(data.message)
    }
  }

  return (
    <div className={styles.login}>
      <h1>Parchment</h1>
      <form method="GET">
        <p className={styles.step}>Step 1 of 1</p>
        <h3 className={styles.subhead}>Login to your account</h3>
        <div
          className={`${styles.error} ${error == '' ? styles.errorhidden : ''}`}
        >
          <img src="/error.svg" alt="" />
          <p>{error}</p>
        </div>
        <EmailInputField
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className={styles.inputfield}>
          <PasswordInputField
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <p>
          Don't have an account? <Link to={'/signup'}>Sign Up</Link>
        </p>

        <div className={styles.buttongroup}>
          <PrimaryButton
            width="140px"
            onClick={(e) => {
              e.preventDefault()
              handleLogin()
            }}
          >
            Login
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
