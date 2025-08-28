import styles from './skeleton.module.css'

export default function EmbedSkeleton() {
  return (
    <>
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
