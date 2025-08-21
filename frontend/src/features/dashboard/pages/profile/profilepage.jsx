import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './profilepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton } from '../../../../components/ui/buttons/buttons'
import { useContext } from 'react'
import { appContext } from '../../../../App'

export default function ProfilePage() {
  const { id } = useParams()
  const { user } = useContext(appContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Show backarrow only when profile is not from left menu
  const backarrow =
    location.pathname.split('/')[2] == undefined ? (
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
    <>
      <NewItemModal />
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.profile}>
          <div className={styles.topheading}>
            {backarrow}
            <img className={styles.coverphoto} src="/exampleback.png" alt="" />
            <img
              className={styles.profilephoto}
              src="/exampleprofile.png"
              alt=""
            />
          </div>
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
            <li>Posts</li>
            <li>Comments</li>
            <li>Reshares</li>
          </ul>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
