import { useState } from 'react'
import styles from './inputfield.module.css'

export function InputField({
  label,
  placeholder = '',
  value,
  setValue,
  icon1,
  icon2 = '',
}) {
  const [isSelected, setIsSelected] = useState(false)

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
        ></input>
        {icon2 != '' ? <img className={styles.last} src={icon2} alt="" /> : ''}
      </div>
    </div>
  )
}
