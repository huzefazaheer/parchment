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

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext({ jwt: null, setJwt: null })

function App() {
  const app = useApp()
  return (
    <appContext.Provider value={app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/posts/:id" element={<PostsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chats/:id" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  )
}

export default App
