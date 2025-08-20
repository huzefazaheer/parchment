import styles from './signup.module.css'

import { useState } from 'react'
import { InputField } from '../../../../components/ui/inputfield/inputfield'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
  const [index, setIndex] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const form1 = (
    <>
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
      <div className={styles.inputfield}>
        <InputField
          label="date"
          placeholder="Enter your birth date"
          icon1={'/date.svg'}
          icon2={'/datepicker.svg'}
          value={password}
          setValue={setPassword}
        ></InputField>
      </div>
    </>
  )

  const form2 = (
    <>
      <InputField
        label="username"
        placeholder="Enter your username"
        icon1={'/email.svg'}
        value={username}
        setValue={setUsername}
      ></InputField>
      <div className={styles.inputfield}>
        <InputField
          label="displayname"
          placeholder="Enter your display name"
          icon1={'/password.svg'}
          icon2={'/eye.svg'}
          value={password}
          setValue={setPassword}
        ></InputField>
      </div>
    </>
  )

  return (
    <div className={styles.login}>
      <h1>Parchment</h1>
      <form method="GET">
        <p className={styles.step}>Step 1 of 1</p>
        <h3 className={styles.subhead}>Create your account</h3>
        {index == 0 ? form1 : form2}
        {index == 0 ? (
          <p>
            Already have an account? <Link to={'/login'}>Login</Link>{' '}
          </p>
        ) : (
          ''
        )}
        <div
          className={`${styles.buttongroup} ${index == 0 ? styles.right : ''}`}
        >
          {index != 0 ? (
            <SecondaryButton
              width="140px"
              onClick={(e) => {
                e.preventDefault()
                setIndex((prev) => prev - 1)
              }}
            >
              Back
            </SecondaryButton>
          ) : (
            ''
          )}
          <PrimaryButton
            width="140px"
            onClick={(e) => {
              e.preventDefault()
              {
                index < 1 ? setIndex((prev) => prev + 1) : ''
              }
            }}
          >
            {index < 1 ? 'Next' : 'Signup'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
