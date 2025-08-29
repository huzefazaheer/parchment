import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/pages/login/login'
import SignUpPage from './features/auth/pages/signup/signup'
import { createContext } from 'react'
import useApp from './utils/useApp'
import Home from './features/dashboard/pages/home/homepage'
import PostsPage from './features/dashboard/pages/posts/postspage'
import ProfilePage from './features/dashboard/pages/profile/profilepage'
import ChatsPage from './features/chat/pages/chats/chatspage'
import ChatPage from './features/chat/pages/chat/chatpage'
import SettingsPage from './features/dashboard/pages/settings/settingspage'
import useSocket from './utils/useSocket'
import { useEffect } from 'react'
import NewItemModal from './features/dashboard/components/newitemmodal/newitem'
import EditProfileModal from './features/dashboard/components/editprofilemodal/editprofile'
import RequestsModal from './features/dashboard/components/requestsmodal/requests'

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext({ jwt: null, setJwt: null })
// eslint-disable-next-line react-refresh/only-export-components
export const socketContext = createContext({ socket: null })

function App() {
  const app = useApp()
  const socket = useSocket()

  useEffect(() => {
    if (app.jwt != null && app.user != null) {
      socket.init(app.user.id)
    }
  }, [app.jwt])

  return (
    <appContext.Provider value={app}>
      <socketContext.Provider value={socket}>
        <BrowserRouter>
          {app.jwt != null ? (
            <>
              <NewItemModal />
              <EditProfileModal />
              <RequestsModal />
            </>
          ) : (
            ''
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/posts/:id" element={<PostsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/chats/:id" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </socketContext.Provider>
    </appContext.Provider>
  )
}

export default App
