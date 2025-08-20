import { useEffect, useState } from 'react'
import styles from './inputfield.module.css'

export function InputField({
  label,
  placeholder = '',
  value,
  setValue,
  icon1,
  icon2 = '',
  onClickIcon2,
}) {
  const [isSelected, setIsSelected] = useState(false)
  const [inputType, setInputType] = useState('text')

  useEffect(() => {
    if (label == 'email' || label == 'password') setInputType(label)
    else setInputType('text')
  }, [])

  function togglePassword() {
    if (inputType == 'text') setInputType('password')
    else setInputType('text')
    console.log(inputType)
  }

  return (
    <div
      className={`${styles['input--primary']} ${styles.input} ${
        isSelected ? styles.selected : styles.unselected
      }`}
    >
      <label htmlFor={label}>{label}</label>
      <div className={styles.inputwrapper}>
        <img src={icon1} alt="" />
        <input
          placeholder={placeholder}
          id={label}
          name={label}
          onFocus={() => setIsSelected(true)}
          onBlur={() => {
            if (value == '') setIsSelected(false)
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={inputType}
        ></input>
        {icon2 != '' ? (
          <img
            className={styles.last}
            src={icon2}
            alt=""
            onClick={() => {
              label == 'password' ? togglePassword() : onClickIcon2()
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
