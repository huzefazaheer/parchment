import PostEmbed from './components/postembed'
import postTime from './getposttime'
import styles from './post.module.css'

export default function Post({ children, text, author, date }) {
  const createdAt = new Date(date)
  const now = new Date()
  const time = now - createdAt

  return (
    <article className={styles.post}>
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
            <span className={styles.time}>{postTime(time)}</span>
          </p>
          <p className={styles.text}>{text}</p>
        </div>

        {children}

        <ul>
          <li>
            <img src="/star.svg" alt="" />
            <p>0</p>
          </li>
          <li>
            <img src="/comment.svg" alt="" />
            <p>0</p>
          </li>
          <li>
            <img src="/repost.svg" alt="" />
            <p>0</p>
          </li>
        </ul>
      </div>
    </article>
  )
}
