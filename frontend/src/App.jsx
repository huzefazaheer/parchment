import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/pages/login/login'
import SignUpPage from './features/auth/pages/signup/signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
