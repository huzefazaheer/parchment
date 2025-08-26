import { useNavigate } from 'react-router-dom'
import styles from './chat.module.css'
import { getOtherUser } from '../utils/directchat_utils'
import { useContext } from 'react'
import { appContext } from '../../../../App'

export default function Chat({ id, lastmsg, users }) {
  const navigate = useNavigate()
  const { user } = useContext(appContext)

  const otherUser = getOtherUser(user, users)

  function goToProfile() {
    navigate('/profile/' + otherUser.id)
  }

  function openChat() {
    navigate('/chats/' + id)
  }
  const text = lastmsg
    ? lastmsg.senderId == user.id
      ? `You: ${lastmsg.text}`
      : `${otherUser.displayName}:  ${lastmsg.text}`
    : 'Nothing here yet'

  return (
    <article className={styles.chat} key={id} onClick={openChat}>
      <img
        onClick={goToProfile}
        className={styles.profilephoto}
        src={otherUser?.photo ? otherUser.photo : '/exampleprofile.png'}
        alt=""
      />

      <div className={styles.right}>
        <div onClick={goToProfile}>
          <p className={styles.header}>
            <span className={styles.displayname}>{otherUser.displayName}</span>
            <span className={styles.username}>@{otherUser.username}</span>
          </p>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </article>
  )
}
