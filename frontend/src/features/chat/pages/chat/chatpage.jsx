import { useNavigate, useParams } from 'react-router-dom'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './chatpage.module.css'
import ChatMessage from '../../components/chatmessage/chatmessage'
import useData from '../../../../utils/useData'
import { useContext, useEffect, useState } from 'react'
import { PrimaryButton } from '../../../../components/ui/buttons/buttons'
import { getOtherUser } from '../../components/utils/directchat_utils'
import { appContext } from '../../../../App'

export default function ChatPage() {
  const navigate = useNavigate()
  const { user } = useContext(appContext)
  const { id } = useParams()
  const [chatUser, setChatUser] = useState({ username: '', displayName: '' })
  const [text, setText] = useState('')
  const getChatFetch = useData('/chats/' + id, 'GET')
  const getChatMessage = useData('/chats/' + id + '/messages', 'get')
  const sendChatMessage = useData('/chats/' + id + '/messages', 'post', {
    text: text,
  })

  useEffect(() => {
    async function getChat() {
      const chat = await getChatFetch.fetchData()
      setChatUser(getOtherUser(user, chat.data.users))
    }
    getChat()
    getChatMessage.fetchData()
  }, [])

  async function sendMessage() {
    await sendChatMessage.fetchData()
    setText('')
  }

  const messages = getChatMessage.loading ? (
    <p>Loading</p>
  ) : getChatMessage.error != null ? (
    <p>An unknown error occured</p>
  ) : getChatMessage.data ? (
    getChatMessage.data.data.map((msg) => {
      return (
        <ChatMessage
          text={msg.text}
          date={msg.timestamp}
          username={msg.sender.displayName}
        />
      )
    })
  ) : (
    ''
  )

  return (
    <>
      <div className={styles.body}>
        <LeftMenu />

        <div className={styles.chats}>
          <div className={styles.topheading}>
            <img
              onClick={() => navigate('/chats')}
              src="/backarrow.svg"
              alt=""
            />
            <h4>
              {chatUser.displayName}
              <span className={styles.username}>@{chatUser.username}</span>
            </h4>
          </div>
          <div>{messages}</div>
          <div className={styles.sendMessage}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <PrimaryButton width="24%" onClick={sendMessage}>
              Send
            </PrimaryButton>
          </div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
