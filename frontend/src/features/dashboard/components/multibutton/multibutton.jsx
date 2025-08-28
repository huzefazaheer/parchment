import { useState } from 'react'
import styles from './multibutton.module.css'
import useData from '../../../../utils/useData'
import { useNavigate } from 'react-router-dom'
import EditProfileModal from '../editprofilemodal/editprofile'
import RequestsModal from '../requestsmodal/requests'
import { useContext } from 'react'
import { appContext, socketContext } from '../../../../App'

export default function MultiButton({ isSelf, userId, btnclick }) {
  const [menuActive, setMenuActive] = useState(false)
  const navigate = useNavigate()
  const createChatFetch = useData('/chats', 'POST', { users: [userId] })
  const [show, toggleShow] = useState(false)
  const [showReq, toggleShowReq] = useState(false)
  const socket = useContext(socketContext)
  const { user } = useContext(appContext)

  async function createChat() {
    const data = await createChatFetch.fetchData()
    console.log(data.data)
    if (data.error == 'CONFLICT') {
      navigate('/chats/' + data.conflict)
    } else {
      navigate('/chats/' + data.data.id)

      socket.createChat({
        id: data.data.id,
        lastmsg: null,
        users: data.data.users,
        otherId: userId,
      })
    }
  }

  async function editProfile() {
    toggleShow(true)
  }

  async function getRequests() {
    toggleShowReq(true)
  }

  const options = isSelf ? (
    <>
      <li onClick={editProfile}>Edit Profile</li>
      <li onClick={getRequests}>Requests</li>
    </>
  ) : (
    <>
      <li onClick={createChat}>Send message</li>
      <li>Report</li>
    </>
  )

  return (
    <>
      <EditProfileModal show={show} toggleShow={toggleShow} />
      <RequestsModal show={showReq} toggleShow={toggleShowReq} />
      <div className={styles.button}>
        <button
          onClick={btnclick}
          className={`${styles.firstbutton} ${isSelf ? styles.selfbtn : ''}`}
        >
          <img src="/follow.svg" alt="" /> <p>Follow</p>
        </button>
        <button
          onClick={() => setMenuActive((prev) => !prev)}
          className={`${styles.secondbutton} ${isSelf ? styles.self2 : ''}`}
        >
          <img src="/option_red.svg" alt="" />
        </button>
        <ul className={`${styles.msg} ${!menuActive ? styles.hidden : ''}`}>
          {options}
        </ul>
      </div>
    </>
  )
}
