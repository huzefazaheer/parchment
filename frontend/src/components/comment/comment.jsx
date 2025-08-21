import styles from './comment.module.css'
import commentTime from './getcommenttime'

export default function Comment({ text, author, date }) {
  const createdAt = new Date(date)
  const now = new Date()
  const time = now - createdAt

  return (
    <article className={styles.comment}>
      <img
        className={styles.profilephoto}
        src={author?.photo ? author.photo : '/exampleprofile.png'}
        alt=""
      />

      <div className={styles.right}>
        <div>
          <p className={styles.header}>
            <span className={styles.displayname}>{author.displayName}</span>
            <span className={styles.username}>@{author.username}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.time}>{commentTime(time)}</span>
          </p>
          <p className={styles.text}>{text}</p>
        </div>

        <ul>
          <li>
            <img src="/star.svg" alt="" />
            <p>0</p>
          </li>
        </ul>
      </div>
    </article>
  )
}
