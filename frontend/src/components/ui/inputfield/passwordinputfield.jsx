import { useState } from 'react'
import styles from './inputfield.module.css'

export function PasswordInputField({ value, onChange, label = 'password' }) {
  const [isSelected, setIsSelected] = useState(value == '' ? false : true)
  const [inputType, setInputType] = useState('password')

  function togglePassword() {
    if (inputType == 'text') setInputType('password')
    else setInputType('text')
  }

  return (
    <div
      className={`${styles['input--primary']} ${styles.input} ${
        isSelected ? styles.selected : styles.unselected
      }`}
    >
      <label htmlFor={'password'}>{label}</label>
      <div className={styles.inputwrapper}>
        <img src={'/password.svg'} alt="" />
        <input
          placeholder={'Enter your password'}
          id={'password'}
          name={'password'}
          onFocus={() => setIsSelected(true)}
          onBlur={() => {
            if (value == '') setIsSelected(false)
          }}
          value={value}
          onChange={(e) => onChange(e)}
          type={inputType}
        ></input>
        <img
          className={styles.last}
          src={'/eye.svg'}
          alt=""
          onClick={togglePassword}
        />
      </div>
    </div>
  )
}
