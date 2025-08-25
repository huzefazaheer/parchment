import { useState } from 'react'
import styles from './multibutton.module.css'
import useData from '../../../utils/useData'
import { useNavigate } from 'react-router-dom'

export default function MultiButton({ isSelf, userId }) {
  const [menuActive, setMenuActive] = useState(false)
  const navigate = useNavigate()
  const createChatFetch = useData('/chats', 'POST', { users: [userId] })

  async function createChat() {
    const data = await createChatFetch.fetchData()
    if (data.error == 'CONFLICT') {
      navigate('/chats/' + data.conflict)
    } else navigate('/chats/' + data.data.id)
  }

  const options = isSelf ? (
    <>
      <li>Edit Profile</li>
    </>
  ) : (
    <>
      <li onClick={createChat}>Send message</li>
      <li>Report</li>
    </>
  )

  return (
    <div className={styles.button}>
      <button className={styles.firstbutton}>
        <img src="/follow.svg" alt="" /> <p>Follow</p>
      </button>
      <button
        onClick={() => setMenuActive((prev) => !prev)}
        className={styles.secondbutton}
      >
        <img src="/option_red.svg" alt="" />
      </button>
      <ul className={`${styles.msg} ${!menuActive ? styles.hidden : ''}`}>
        {options}
      </ul>
    </div>
  )
}
