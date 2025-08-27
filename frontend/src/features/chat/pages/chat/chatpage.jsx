import { useNavigate, useParams } from 'react-router-dom'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './chatpage.module.css'
import ChatMessage from '../../components/chatmessage/chatmessage'
import useData from '../../../../utils/useData'
import { useContext, useEffect, useState } from 'react'
import { getOtherUser } from '../../components/utils/directchat_utils'
import { appContext } from '../../../../App'
import MsgSender from './component/messagesender'
import CommentSkeleton from '../../../dashboard/components/comment/skeleton/commentskeleton'
import MessageSkeleton from '../../components/chatmessage/skeleton/messageskeleton'

export default function ChatPage() {
  const navigate = useNavigate()
  const { user } = useContext(appContext)
  const { id } = useParams()
  const [chatUser, setChatUser] = useState({ username: '', displayName: '' })
  const getChatFetch = useData('/chats/' + id, 'GET')
  const getChatMessage = useData('/chats/' + id + '/messages', 'get')

  useEffect(() => {
    async function getChat() {
      const chat = await getChatFetch.fetchData()
      setChatUser(getOtherUser(user, chat.data.users))
    }
    getChat()
    getChatMessage.fetchData()
  }, [])

  const messages = getChatMessage.loading ? (
    <div>
      <MessageSkeleton isSent={false} />
      <MessageSkeleton isSent={true} />
      <MessageSkeleton isSent={true} />
      <MessageSkeleton isSent={false} />
    </div>
  ) : getChatMessage.error != null ? (
    <p>An unknown error occured</p>
  ) : getChatMessage.data ? (
    getChatMessage.data.data.map((msg) => {
      return (
        <ChatMessage
          text={msg.text}
          date={msg.timestamp}
          username={msg.sender.displayName}
          photo={chatUser.photo}
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
              {chatUser.displayName ? (
                <>
                  {chatUser.displayName}
                  <span className={styles.username}>@{chatUser.username}</span>
                </>
              ) : (
                <div className={styles.chatdetailskeleton}></div>
              )}
            </h4>
          </div>
          <div>{messages}</div>
          <MsgSender id={id} />
        </div>
        <RightMenu />
      </div>
    </>
  )
}
