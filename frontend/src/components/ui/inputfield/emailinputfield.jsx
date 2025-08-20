import { useState } from 'react'
import styles from './inputfield.module.css'

export function EmailInputField({ value, onChange }) {
  const [isSelected, setIsSelected] = useState(value == '' ? false : true)

  return (
    <div
      className={`${styles['input--primary']} ${styles.input} ${
        isSelected ? styles.selected : styles.unselected
      }`}
    >
      <label htmlFor={'email'}>{'email'}</label>
      <div className={styles.inputwrapper}>
        <img src={'/email.svg'} alt="" />
        <input
          placeholder={'Enter your email'}
          id={'email'}
          name={'email'}
          onFocus={() => setIsSelected(true)}
          onBlur={() => {
            if (value == '') setIsSelected(false)
          }}
          value={value}
          onChange={(e) => onChange(e)}
          type={'email'}
        ></input>
      </div>
    </div>
  )
}
