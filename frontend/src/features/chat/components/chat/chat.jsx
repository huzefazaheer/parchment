import { useNavigate } from 'react-router-dom'
import styles from './chat.module.css'

export default function Chat({ id, text, author }) {
  const navigate = useNavigate()

  function goToProfile() {
    navigate('/profile/' + author.id)
  }

  function openChat() {
    navigate('/chats/' + id)
  }

  return (
    <article className={styles.comment} key={id} onClick={openChat}>
      <img
        onClick={goToProfile}
        className={styles.profilephoto}
        src={author?.photo ? author.photo : '/exampleprofile.png'}
        alt=""
      />

      <div className={styles.right}>
        <div onClick={goToProfile}>
          <p className={styles.header}>
            <span className={styles.displayname}>{author.displayName}</span>
            <span className={styles.username}>@{author.username}</span>
          </p>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </article>
  )
}
