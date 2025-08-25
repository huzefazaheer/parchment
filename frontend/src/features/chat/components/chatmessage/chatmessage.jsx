import { useContext } from 'react'
import styles from './chatmessage.module.css'
import { appContext } from '../../../../App'

export default function ChatMessage({ text, username, date }) {
  const { user } = useContext(appContext)

  const isSent = username == user.displayName ? true : false
  const msgDate = new Date(date)

  function formatDate(date) {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' }) // Tue
    const time = date
      .toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .replace('AM', 'am')
      .replace('PM', 'pm')

    return `${weekday}, ${time}` // Tue, 3:17pm
  }

  return (
    <div className={`${styles.message} ${isSent ? styles.messagesent : ''}`}>
      <div className={styles.userdetail}>
        <img className={styles.photo} src="/exampleprofile.png" alt="" />
        <div>
          <p className={styles.username}>{isSent ? 'You' : username}</p>
          <p className={styles.date}>{formatDate(msgDate)}</p>
        </div>
      </div>
      <p className={styles.messagetext}>{text}</p>
    </div>
  )
}
