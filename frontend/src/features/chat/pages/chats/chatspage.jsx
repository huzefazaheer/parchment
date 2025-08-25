import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import Chat from '../../components/chat/chat'
import styles from './chatspage.module.css'

export default function ChatsPage() {
  return (
    <>
      <div className={styles.body}>
        <LeftMenu />

        <div className={styles.chats}>
          <div className={styles.topheading}>
            <h4>Chats</h4>
          </div>
          <div>
            <Chat
              author={{ username: 'sirronrex.so', displayName: 'SirronRex' }}
              id={1}
              text={
                'Ceasefire and nuclear talks in Alaska… feels like Cold War history repeating itself, but hopefully with a better ending this time.'
              }
            />
          </div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
