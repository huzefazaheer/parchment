import styles from './menu.module.css'

export default function RightMenu() {
  return (
    <div className={styles.menu}>
      <div className={styles.searchbar}>
        <img src="/search.svg" alt="" />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  )
}
