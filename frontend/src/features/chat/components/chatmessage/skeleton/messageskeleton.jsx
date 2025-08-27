import styles from './messageskeleton.module.css'

export default function MessageSkeleton({ isSent }) {
  return (
    <div className={`${styles.message} ${isSent ? styles.messagesent : ''}`}>
      <div className={styles.userdetail}>
        <div className={styles.photo}></div>
        <div>
          <p className={styles.username}></p>
          <p className={styles.date}></p>
        </div>
      </div>
      <p className={styles.messagetext}></p>
    </div>
  )
}
