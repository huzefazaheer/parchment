import styles from './profileheader.module.css'
import { useContext } from 'react'
import { appContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../../../../../../components/ui/buttons/buttons'

export default function ProfileHeader({ id, setIndex, index }) {
  const { user } = useContext(appContext)
  const navigate = useNavigate()

  // Show backarrow only when profile is not from left menu
  const backarrow =
    id == undefined ? (
      ''
    ) : (
      <img
        className={styles.backarrow}
        onClick={() => navigate('/')}
        src="/backarrow.svg"
        alt=""
      />
    )

  return (
    <div className={styles.heading}>
      <div className={styles.topheading}>
        {backarrow}
        <img className={styles.coverphoto} src="/exampleback.png" alt="" />
        <img className={styles.profilephoto} src="/exampleprofile.png" alt="" />
      </div>
      <div>
        <div className={styles.profileinfo}>
          <div className={styles.left}>
            <p className={styles.displayname}>{user.displayName}</p>
            <p className={styles.username}>@{user.username}</p>
            {/* Make this Work */}
            <p className={styles.stats}>
              <strong>10m</strong> followers
              <span className={styles.dot}> • </span>
              <strong>12</strong> following
              <span className={styles.dot}> • </span>
              <strong>172</strong> posts
            </p>
          </div>
          <PrimaryButton width="140px" height="32px">
            + Follow
          </PrimaryButton>
        </div>
        <ul className={styles.menu}>
          <li
            className={index == 0 ? styles.active : ''}
            onClick={() => setIndex(0)}
          >
            Posts
          </li>
          <li
            className={index == 1 ? styles.active : ''}
            onClick={() => setIndex(1)}
          >
            Comments
          </li>
          <li
            className={index == 2 ? styles.active : ''}
            onClick={() => setIndex(2)}
          >
            Reshares
          </li>
        </ul>
      </div>
    </div>
  )
}
