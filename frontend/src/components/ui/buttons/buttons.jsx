import styles from './buttons.module.css'

export function PrimaryButton({ children, onClick }) {
  return (
    <button className={styles['button--primary']} onClick={onClick}>
      {children}
    </button>
  )
}

export function SecondaryButton({ children, onClick }) {
  return (
    <button className={styles['button--secondary']} onClick={onClick}>
      {children}
    </button>
  )
}
