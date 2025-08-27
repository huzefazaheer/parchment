import useData from '../../../../utils/useData'
import styles from './followrequest.module.css'

export default function FollowRequest({ id, user, isSent }) {
  const acceptReqFetch = useData('/followreq/' + id, 'PATCH')
  const delReqFetch = useData('/followreq/' + id, 'delete')

  async function acceptRequest() {
    console.log(await acceptReqFetch.fetchData())
  }

  async function deleteRequest() {
    console.log(await delReqFetch.fetchData())
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
