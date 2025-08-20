import { useContext } from 'react'
import { appContext } from '../App'

export default function Home() {
  const { jwt } = useContext(appContext)
  return <h1>{jwt ? jwt : 'no jwt'}</h1>
}
