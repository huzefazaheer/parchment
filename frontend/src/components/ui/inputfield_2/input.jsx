import styles from './input.module.css'

export default function InputAlt({ label, value, readonly = false, onChange }) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      {readonly ? (
        <input value={value} readOnly type="text" />
      ) : (
        <input value={value} type="text" onChange={(e) => onChange(e)} />
      )}
    </div>
  )
}
