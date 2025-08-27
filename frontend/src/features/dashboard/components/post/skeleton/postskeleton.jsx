import styles from './skeleton.module.css'

export default function PostSkeleton() {
  return (
    <>
      <article className={styles.post}>
        <div className={styles.profilephoto}></div>

        <div className={styles.right}>
          <div className={styles.textholder}>
            <div className={styles.text}></div>
            <div className={styles.text}></div>
          </div>
        </div>
      </article>
      <aside className={styles.embed}>
        <div className={styles.emded_img}></div>
        <div className={styles.textwrapper}>
          <p className={styles.embed_text}></p>
          <p className={styles.link_text}></p>
          <div className={styles.linkwrapper}>
            <div className={styles.link}></div>
          </div>
        </div>
      </aside>
    </>
  )
}
