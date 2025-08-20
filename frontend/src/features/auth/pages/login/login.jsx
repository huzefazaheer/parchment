import styles from './login.module.css'

import { useState } from 'react'
import { InputField } from '../../../../components/ui/inputfield/inputfield'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.login}>
      <h1>Parchment</h1>
      <form method="GET">
        <p className={styles.step}>Step 1 of 1</p>
        <h3 className={styles.subhead}>Login to your account</h3>
        <InputField
          label="email"
          placeholder="Enter your email"
          icon1={'/email.svg'}
          value={username}
          setValue={setUsername}
        ></InputField>
        <div className={styles.inputfield}>
          <InputField
            label="password"
            placeholder="Enter your password"
            icon1={'/password.svg'}
            icon2={'/eye.svg'}
            value={password}
            setValue={setPassword}
          ></InputField>
        </div>
        <p>
          Don't have an account? <Link to={'/signup'}>Sign Up</Link>{' '}
        </p>
        <div className={styles.buttongroup}>
          <PrimaryButton
            width="140px"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            Login
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
