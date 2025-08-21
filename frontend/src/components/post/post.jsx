import PostEmbed from './components/postembed'
import styles from './post.module.css'

export default function Post({ children, text }) {
  return (
    <article className={styles.post}>
      <img
        className={styles.profilephoto}
        src="https://images.seeklogo.com/logo-png/28/1/reuters-logo-png_seeklogo-286647.png"
        alt=""
      />

      <div className={styles.right}>
        <div>
          <p className={styles.header}>
            <span className={styles.displayname}>Reuters</span>
            <span className={styles.username}>@reuters.com</span>
            <span className={styles.dot}>.</span>
            <span className={styles.time}>10m</span>
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
