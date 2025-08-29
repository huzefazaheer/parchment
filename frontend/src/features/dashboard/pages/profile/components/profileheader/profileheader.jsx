import styles from './profileheader.module.css'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../../../../../../components/ui/buttons/buttons'
import useData from '../../../../../../utils/useData'
import MultiButton from '../../../../components/multibutton/multibutton'

export default function ProfileHeader({
  id,
  setIndex,
  index,
  userId,
  scrollProgress,
}) {
  const { user, jwt } = useContext(appContext)
  const navigate = useNavigate()
  const userFetch = useData('/user/' + userId, 'GET')
  const selfFetch = useData('/user/self', 'GET')
  const [currUser, setCurrUser] = useState({ username: '', displayName: '' })
  const requestFetch = useData('/followreq', 'POST', { id })
  const reqStatusFetch = useData(`/user/${userId}/followstatus`, 'GET')
  const [followStatusData, setFollowStatusData] = useState('none')
  const [selfData, setSelfData] = useState({
    followers: 0,
    following: 0,
    posts: 0,
  })

  const isSelf = userId == user.id
  const isScrolled = scrollProgress >= 0.044 ? true : false

  useEffect(() => {
    if (user == null || jwt == null) return

    async function getUser() {
      const data = await userFetch.fetchData()
      setCurrUser(data.data)
      await getRequestStatus()
    }
    async function getSelfData() {
      const data = await selfFetch.fetchData()
      setSelfData(data.data._count)
    }

    if (!isSelf) {
      getUser()
    } else getSelfData()
  }, [isSelf, user, jwt])

  async function getRequestStatus() {
    if (isSelf) return
    const { data } = await reqStatusFetch.fetchData()
    setFollowStatusData(data)
  }

  async function sendRequest() {
    if (isSelf) return
    if (followStatusData == 'none') {
      const res = await requestFetch.fetchData()
      if (res.success == true) {
        setFollowStatusData('req')
      }
    }
  }

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
    <>
      <div className={styles.heading}>
        <div className={styles.topheading}>
          {backarrow}
          {user.backdrop || currUser.backdrop ? (
            <img
              className={styles.coverphoto}
              src={isSelf ? user.backdrop : currUser.backdrop}
              alt=""
            />
          ) : (
            <div className={styles.skeletonbackdrop}></div>
          )}
        </div>
      </div>
      <div className={`${styles.sticky} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.profileinfo}>
          <div className={styles.left}>
            {user.photo || currUser.photo ? (
              <img
                className={styles.profilephoto}
                src={isSelf ? user.photo : currUser.photo}
                alt=""
              />
            ) : (
              <div className={styles.skeletonimg}></div>
            )}
            <div>
              <p className={styles.displayname}>
                {isSelf ? user.displayName : currUser.displayName}
              </p>
              <p className={styles.username}>
                @{isSelf ? user.username : currUser.username}
              </p>
              <p className={styles.stats}>
                <strong>
                  {isSelf ? selfData.followers : currUser?._count?.followers}
                </strong>{' '}
                followers
                <span className={styles.dot}> • </span>
                <strong>
                  {isSelf ? selfData.following : currUser?._count?.following}
                </strong>{' '}
                following
                <span className={styles.dot}> • </span>
                <strong>
                  {isSelf ? selfData.posts : currUser?._count?.posts}
                </strong>{' '}
                posts
              </p>
            </div>
          </div>
          <div className={styles.multibutton}>
            <MultiButton
              isSelf={isSelf}
              userId={userId}
              btnclick={sendRequest}
              followStatusData={followStatusData}
            />
          </div>
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
    </>
  )
}
