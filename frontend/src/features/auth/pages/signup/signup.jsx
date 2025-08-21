import styles from './signup.module.css'

import { useContext, useEffect, useState } from 'react'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { Link, useNavigate } from 'react-router-dom'
import Form1 from './components/form1'
import Form2 from './components/form2'
import useData from '../../../../utils/useData'
import { appContext } from '../../../../App'

export default function SignUpPage() {
  const [index, setIndex] = useState(1)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    displayName: '',
    date: '',
  })
  const { setJwt } = useContext(appContext)
  const signupFetch = useData('/auth/signup', 'POST', formData)
  const navigate = useNavigate()

  async function handleSignup() {
    const data = await signupFetch.fetchData()
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
        <p className={styles.step}>{`Step ${index} of 2`}</p>
        <h3 className={styles.subhead}>Create your account</h3>
        <div
          className={`${styles.error} ${error == '' ? styles.errorhidden : ''}`}
        >
          <img src="/error.svg" alt="" />
          <p>{error}</p>
        </div>

        {index == 1 ? (
          <>
            <Form1 formData={formData} setFormData={setFormData} />
            <p>
              Already have an account? <Link to={'/login'}>Login</Link>{' '}
            </p>
          </>
        ) : (
          <Form2 formData={formData} setFormData={setFormData} />
        )}

        <div
          className={`${styles.buttongroup} ${index == 1 ? styles.right : ''}`}
        >
          {index != 1 ? (
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
            onClick={async (e) => {
              e.preventDefault()

              index < 2 ? setIndex((prev) => prev + 1) : handleSignup()
            }}
          >
            {index < 2 ? 'Next' : 'Signup'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
