import { useEffect } from 'react'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import Chat from '../../components/chat/chat'
import styles from './chatspage.module.css'
import useData from '../../../../utils/useData'
import CommentSkeleton from '../../../dashboard/components/comment/skeleton/commentskeleton'
import { useState } from 'react'
import { useContext } from 'react'
import { appContext, socketContext } from '../../../../App'

export default function ChatsPage() {
  const chatsFetch = useData('/user/chats', 'GET')
  const [chatsData, setChatsData] = useState([])
  const socket = useContext(socketContext)
  const { user, jwt } = useContext(appContext)

  useEffect(() => {
    if (!user || !jwt) return

    async function getData() {
      const { data } = await chatsFetch.fetchData()
      setChatsData(data.chats)
    }
    getData()
  }, [user, jwt])

  useEffect(() => {
    if (socket.newChat == null) return

    setChatsData([
      ...chatsData,
      { id: socket.newChat.id, lastmsg: null, users: socket.newChat.users },
    ])
  }, [socket.newChat])

  const chats = chatsFetch.loading ? (
    <div>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  ) : chatsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : chatsFetch.data ? (
    chatsData.map((chat) => {
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
