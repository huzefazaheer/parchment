import styles from './buttons.module.css'

export function PrimaryButton({ children, onClick, width = '', height = '' }) {
  return (
    <button
      className={styles['button--primary']}
      onClick={onClick}
      style={{
        width: width !== '' ? width : '',
        height: height !== '' ? height : '',
      }}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  onClick,
  width = '',
  height = '',
}) {
  return (
    <button
      className={styles['button--secondary']}
      onClick={onClick}
      style={{
        width: width !== '' ? width : '',
        height: height !== '' ? height : '',
      }}
    >
      {children}
    </button>
  )
}
