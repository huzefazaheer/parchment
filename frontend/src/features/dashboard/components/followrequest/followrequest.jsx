import { useContext } from 'react'
import useData from '../../../../utils/useData'
import styles from './followrequest.module.css'
import { socketContext } from '../../../../App'

export default function FollowRequest({ id, user, isSent }) {
  const acceptReqFetch = useData('/followreq/' + id, 'PATCH')
  const delReqFetch = useData('/followreq/' + id, 'delete')
  const socket = useContext(socketContext)

  async function acceptRequest() {
    await acceptReqFetch.fetchData()
  }

  async function deleteRequest() {
    await delReqFetch.fetchData()
    socket.deleteRequest(id, user.id)
  }

  return (
    <li className={styles.req} key={id}>
      <img className={styles.photo} src={user.photo} alt="" />
      <div>
        <p className={styles.displayname}>{user.displayName}</p>
        <p className={styles.username}>@{user.username}</p>
      </div>
      {isSent ? (
        <div className={styles.controlwrapper}>
          <img
            className={styles.control}
            src="/cross_red.svg"
            onClick={deleteRequest}
          ></img>
        </div>
      ) : (
        <div className={styles.controlwrapper}>
          <img
            className={styles.control}
            src="/cross_red.svg"
            onClick={deleteRequest}
          ></img>
          <img
            className={styles.control}
            src="/tick_green.svg"
            onClick={acceptRequest}
          ></img>
        </div>
      )}
    </li>
  )
}
