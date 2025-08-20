import { useState } from 'react'

export default function useApp() {
  const [jwt, setJwt] = useState(null)

  return { jwt, setJwt }
}
