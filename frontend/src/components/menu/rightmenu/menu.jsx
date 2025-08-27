import { useRef, useState } from 'react'
import useData from '../../../utils/useData'
import styles from './menu.module.css'
import User from './components/user/user'

export default function RightMenu() {
  const [search, setSearch] = useState('')
  const usersFetch = useData('/user', 'get')

  async function searchUsers(username) {
    if (username != '' && username.length > 2) {
      setTimeout(async () => {
        console.log(await usersFetch.fetchData(`/user?username=${username}`))
      }, 500)
    }
  }

  const users = usersFetch.loading ? (
    <p>Loading</p>
  ) : usersFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : usersFetch.data ? (
    usersFetch.data.data.map((user) => {
      return <User user={user} />
    })
  ) : (
    ''
  )

  return (
    <div className={`${styles.menu}}`}>
      <div className={styles.searchbar}>
        <img src="/search.svg" alt="" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            searchUsers(e.target.value)
          }}
          onBlur={(e) =>
            setTimeout(() => {
              setSearch('')
            }, 500)
          }
        />
      </div>
      <div className={styles.users}>{search != '' ? users : ''}</div>
    </div>
  )
}
