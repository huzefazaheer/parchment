import styles from './requests.module.css'
import { SecondaryButton } from '../../../../components/ui/buttons/buttons'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../../../App'
import useData from '../../../../utils/useData'
import FollowRequest from '../followrequest/followrequest'

export default function RequestsModal({ show, toggleShow }) {
  const { user, updateJwt } = useContext(appContext)
  const [index, setIndex] = useState(0)
  const sentRequestsFetch = useData('/followreq/sent', 'GET')
  const receivedRequestsFetch = useData('/followreq/received', 'GET')

  useEffect(() => {
    sentRequestsFetch.fetchData()
    receivedRequestsFetch.fetchData()
  }, [])

  function exitModal() {
    toggleShow(false)
  }

  const sent = sentRequestsFetch.loading ? (
    <p>Loading</p>
  ) : sentRequestsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : sentRequestsFetch.data ? (
    sentRequestsFetch.data.data.map((req) => {
      return <FollowRequest user={req.receiver} isSent={true} id={req.id} />
    })
  ) : (
    <p>Nothing here</p>
  )

  const received = receivedRequestsFetch.loading ? (
    <p>Loading</p>
  ) : receivedRequestsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : receivedRequestsFetch.data ? (
    receivedRequestsFetch.data.data.map((req) => {
      return <FollowRequest user={req.sender} isSent={false} id={req.id} />
    })
  ) : (
    <p>Nothing here</p>
  )

  return (
    <div
      className={`${styles.modalcontainer} ${show ? '' : styles.modalhidden}`}
    >
      <div className={styles.modal}>
        <div className={styles.top}>
          <h3
            onClick={() => setIndex(0)}
            className={index == 0 ? styles.active : ''}
          >
            Sent
          </h3>
          <h3
            onClick={() => setIndex(1)}
            className={index == 1 ? styles.active : ''}
          >
            Received
          </h3>
        </div>
        <ul>{index == 0 ? sent : received}</ul>
        <div className={styles.control}>
          <SecondaryButton width="100px" height="40px" onClick={exitModal}>
            Back
          </SecondaryButton>
        </div>
      </div>
    </div>
  )
}
