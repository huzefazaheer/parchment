import { useNavigate } from 'react-router-dom'
import styles from './user.module.css'

export default function User({ user }) {
  const navigate = useNavigate()
  return (
    <ul className={styles.user} onClick={() => navigate(`/profile/${user.id}`)}>
      <img className={styles.photo} src={user.photo} alt="" />
      <div>
        <li className={styles.dusplayname}>{user.displayName}</li>
        <li className={styles.username}>@{user.username}</li>
      </div>
    </ul>
  )
}
