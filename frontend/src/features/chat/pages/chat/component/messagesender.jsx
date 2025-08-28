import { useState } from 'react'
import styles from './messagesender.module.css'
import useData from '../../../../../utils/useData'
import { PrimaryButton } from '../../../../../components/ui/buttons/buttons'
import { useContext } from 'react'
import { appContext, socketContext } from '../../../../../App'

export default function MsgSender({ id }) {
  const [text, setText] = useState('')
  const { user } = useContext(appContext)
  const sendChatMessage = useData('/chats/' + id + '/messages', 'post', {
    text: text,
  })
  const socket = useContext(socketContext)

  async function sendMessage() {
    await sendChatMessage.fetchData()
    socket.sendMessage(id, text, user)
    setText('')
  }

  return (
    <div className={styles.sendMessage}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Send a message"
      ></input>
      <PrimaryButton width="45px" height="38px" onClick={sendMessage}>
        <img src="/send.svg" alt="" />
      </PrimaryButton>
    </div>
  )
}
