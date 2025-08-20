import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/pages/login/login'
import SignUpPage from './features/auth/pages/signup/signup'
import { createContext } from 'react'
import Home from './features/homepage'
import useApp from './utils/useApp'

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
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  )
}

export default App
