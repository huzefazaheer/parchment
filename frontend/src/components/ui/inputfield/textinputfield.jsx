import { useState } from 'react'
import styles from './inputfield.module.css'

export function TextInputField({
  label,
  placeholder = '',
  value,
  onChange,
  icon1,
}) {
  const [isSelected, setIsSelected] = useState(value == '' ? false : true)

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
          onChange={(e) => onChange(e)}
          type={'text'}
        ></input>
      </div>
    </div>
  )
}
