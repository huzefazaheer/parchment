import { useState } from 'react'
import styles from './inputfield.module.css'

export function InputField({ label, placeholder = '', value, setValue }) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div
      className={`${styles['input--primary']} ${
        isSelected ? styles.selected : styles.unselected
      }`}
    >
      <label htmlFor={label}>{label}</label>
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
      ></input>
    </div>
  )
}
