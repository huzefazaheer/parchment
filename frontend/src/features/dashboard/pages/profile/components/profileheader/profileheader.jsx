import styles from './profileheader.module.css'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../../../../../App'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../../../../../../components/ui/buttons/buttons'
import useData from '../../../../../../utils/useData'
import MultiButton from '../../../../components/multibutton/multibutton'

export default function ProfileHeader({ id, setIndex, index, userId }) {
  const { user } = useContext(appContext)
  const navigate = useNavigate()
  const userFetch = useData('/user/' + userId, 'GET')
  const selfFetch = useData('/user/self', 'GET')
  const [currUser, setCurrUser] = useState({ username: '', displayName: '' })
  const requestFetch = useData('/followreq', 'POST', { id })
  const [selfData, setSelfData] = useState({
    followers: 0,
    following: 0,
    posts: 0,
  })

  const isSelf = userId == user.id

  useEffect(() => {
    async function getUser() {
      const data = await userFetch.fetchData()
      setCurrUser(data.data)
    }
    async function getSelfData() {
      const data = await selfFetch.fetchData()
      setSelfData(data.data._count)
      console.log(data)
    }
    if (!isSelf) {
      getUser()
    } else getSelfData()
  }, [isSelf])

  async function sendRequest() {
    if (isSelf) return
    console.log(await requestFetch.fetchData())
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
    <div className={styles.heading}>
      <div className={styles.topheading}>
        {backarrow}
        <img
          className={styles.coverphoto}
          src={isSelf ? user.backdrop : currUser.backdrop}
          alt=""
        />
        <img
          className={styles.profilephoto}
          src={isSelf ? user.photo : currUser.photo}
          alt=""
        />
      </div>
      <div>
        <div className={styles.profileinfo}>
          <div className={styles.left}>
            <p className={styles.displayname}>
              {isSelf ? user.displayName : currUser.displayName}
            </p>
            <p className={styles.username}>
              @{isSelf ? user.username : currUser.username}
            </p>
            {/* Make this Work */}
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
          <MultiButton isSelf={isSelf} userId={userId} btnclick={sendRequest} />
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
