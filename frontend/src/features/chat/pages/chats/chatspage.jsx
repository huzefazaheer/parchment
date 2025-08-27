import { useEffect } from 'react'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import Chat from '../../components/chat/chat'
import styles from './chatspage.module.css'
import useData from '../../../../utils/useData'
import CommentSkeleton from '../../../dashboard/components/comment/skeleton/commentskeleton'

export default function ChatsPage() {
  const chatsFetch = useData('/user/chats', 'GET')

  useEffect(() => {
    chatsFetch.fetchData()
  }, [])

  const chats = chatsFetch.loading ? (
    <div>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  ) : chatsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : chatsFetch.data ? (
    chatsFetch.data.data.chats.map((chat) => {
      console.log(chat)
      return (
        <Chat
          id={chat.id}
          lastmsg={chat?.lastMessage}
          users={chat.users}
        ></Chat>
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
            <h4>Chats</h4>
          </div>
          <div>{chats}</div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
