import { useState } from 'react'
import styles from './multibutton.module.css'
import useData from '../../../../utils/useData'
import { useNavigate } from 'react-router-dom'
import EditProfileModal from '../editprofilemodal/editprofile'

export default function MultiButton({ isSelf, userId }) {
  const [menuActive, setMenuActive] = useState(false)
  const navigate = useNavigate()
  const createChatFetch = useData('/chats', 'POST', { users: [userId] })
  const [show, toggleShow] = useState(false)

  async function createChat() {
    const data = await createChatFetch.fetchData()
    if (data.error == 'CONFLICT') {
      navigate('/chats/' + data.conflict)
    } else navigate('/chats/' + data.data.id)
  }

  async function editProfile() {
    toggleShow(true)
  }

  const options = isSelf ? (
    <>
      <li onClick={editProfile}>Edit Profile</li>
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
      <div className={styles.button}>
        <button
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
