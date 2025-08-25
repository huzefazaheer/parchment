import { useNavigate } from 'react-router-dom'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './chatpage.module.css'
import ChatMessage from '../../components/chatmessage/chatmessage'

export default function ChatPage() {
  const navigate = useNavigate()

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
              SirronRex<span className={styles.username}>@sirronrex.so</span>
            </h4>
          </div>
          <div>
            <ChatMessage
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
              username={'SimonRex'}
              date={'December 20, 2025 10:30:00'}
            />
            <ChatMessage
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
              username={'Huzefa Zaheer'}
              date={'December 25, 2025 10:30:00'}
            />
            <ChatMessage
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
              username={'SimonRex'}
              date={'December 20, 2025 10:30:00'}
            />
            <ChatMessage
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
              username={'Huzefa Zaheer'}
              date={'December 25, 2025 10:30:00'}
            />
            <ChatMessage
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
              username={'SimonRex'}
              date={'December 20, 2025 10:30:00'}
            />
            <ChatMessage
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
              username={'Huzefa Zaheer'}
              date={'December 25, 2025 10:30:00'}
            />
          </div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
