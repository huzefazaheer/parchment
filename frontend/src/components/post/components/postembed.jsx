import styles from './postembed.module.css'

export default function PostEmbed() {
  return (
    <aside className={styles.embed}>
      <div className={styles.emded_img}></div>
      <div className={styles.textwrapper}>
        <p className={styles.embed_text}>
          Live Update: Stakes high for Ukraine as Trump and Putin prepare to
          meet
        </p>
        <p className={styles.link_text}>
          The US president says a second meeting with Ukraine President
          Volodymyr Zelensky could follow, while Moscow has raised the idea of a
          nuclear arms...
        </p>
        <div className={styles.linkwrapper}>
          <img src="/web.svg" alt="" />
          <p className={styles.link}>reut.rs</p>
        </div>
      </div>
    </aside>
  )
}
