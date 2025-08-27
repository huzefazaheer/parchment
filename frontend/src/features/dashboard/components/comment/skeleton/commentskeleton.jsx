import styles from './skeleton.module.css'

export default function CommentSkeleton() {
  return (
    <>
      <article className={styles.comment}>
        <div className={styles.profilephoto}></div>

        <div className={styles.right}>
          <div className={styles.textholder}>
            <div className={styles.text}></div>
            <div className={styles.text}></div>
          </div>
        </div>
      </article>
    </>
  )
}
