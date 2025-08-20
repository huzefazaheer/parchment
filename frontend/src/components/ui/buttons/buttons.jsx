import styles from './buttons.module.css'

export function PrimaryButton({ children, onClick, width = '' }) {
  return (
    <button
      className={styles['button--primary']}
      onClick={onClick}
      style={width != '' ? { width: width } : ''}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, onClick, width = '' }) {
  return (
    <button
      className={styles['button--secondary']}
      onClick={onClick}
      style={width != '' ? { width: width } : ''}
    >
      {children}
    </button>
  )
}
