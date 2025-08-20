import { useEffect, useState } from 'react'
import styles from './inputfield.module.css'

export function DateInputField({ value, setValue, onChange }) {
  const [isSelected, setIsSelected] = useState(value == '' ? false : true)

  useEffect(() => {
    const today = new Date()

    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    const formattedDate = `${day}/${month}/${year}`
    setValue(formattedDate)
  }, [])

  return (
    <div
      className={`${styles['input--primary']} ${styles.input} ${
        isSelected ? styles.selected : styles.unselected
      }`}
    >
      <label htmlFor={'date'}>{'date'}</label>
      <div className={styles.inputwrapper}>
        <img src={'/date.svg'} alt="" />
        <input
          placeholder={'Enter your birth date'}
          id={'date'}
          name={'date'}
          onFocus={() => setIsSelected(true)}
          onBlur={() => {
            if (value == '') setIsSelected(false)
          }}
          value={value}
          onChange={(e) => onChange(e)}
          type={'text'}
        ></input>
        <img className={styles.last} src={'/datepicker.svg'} alt="" />
      </div>
    </div>
  )
}

//TODO: Fix date change
