import styles from './login.module.css'

import { useState } from 'react'
import { PrimaryButton } from '../../../../components/ui/buttons/buttons'
import { Link } from 'react-router-dom'
import { EmailInputField } from '../../../../components/ui/inputfield/emailinputfield'
import { PasswordInputField } from '../../../../components/ui/inputfield/passwordinputfield'
import useData from '../../../../utils/useData'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const loginFetch = useData('/auth/login/email', 'POST', formData)

  return (
    <div className={styles.login}>
      <h1>Parchment</h1>
      <form method="GET">
        <p className={styles.step}>Step 1 of 1</p>
        <h3 className={styles.subhead}>Login to your account</h3>

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
              console.log(loginFetch.fetchData())
            }}
          >
            Login
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
