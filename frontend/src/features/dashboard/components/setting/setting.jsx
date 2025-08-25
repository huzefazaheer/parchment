import styles from './setting.module.css'

export default function Setting({ name, icon, isActive = false, children }) {
  return (
    <>
      <div className={`${styles.setting} ${isActive ? styles.active : ''}`}>
        <img src={icon} alt="" />
        <p>{name}</p>
        <img src="/arrowright.svg" alt="" />
      </div>
      <div className={isActive ? '' : styles.hidden}>{children}</div>
    </>
  )
}

export function SettingAction({ name, clickfn }) {
  return (
    <p onClick={clickfn} className={styles.action}>
      {name}
    </p>
  )
}
