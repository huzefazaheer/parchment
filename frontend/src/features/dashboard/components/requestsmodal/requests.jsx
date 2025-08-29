import styles from './requests.module.css'
import { SecondaryButton } from '../../../../components/ui/buttons/buttons'
import { useEffect, useState } from 'react'
import useData from '../../../../utils/useData'
import FollowRequest from '../followrequest/followrequest'
import { useContext } from 'react'
import { appContext, socketContext } from '../../../../App'

export default function RequestsModal() {
  const [index, setIndex] = useState(0)
  const sentRequestsFetch = useData('/followreq/sent', 'GET')
  const receivedRequestsFetch = useData('/followreq/received', 'GET')
  const socket = useContext(socketContext)
  const { user, jwt, setShowRequestsModal, showRequestsModal } =
    useContext(appContext)
  const [sentReqData, setSentReqData] = useState([])
  const [receivedReqData, setReceivedReqData] = useState([])

  useEffect(() => {
    async function getData() {
      const d1 = await sentRequestsFetch.fetchData()
      const d2 = await receivedRequestsFetch.fetchData()
      console.log(d1)
      setSentReqData(d1.data)
      setReceivedReqData(d2.data)
    }
    getData()
  }, [])

  useEffect(() => {
    if (user == null || jwt == null) return

    if (socket.deletedReq == null) return
    const deletedReq = socket.deletedReq
    if (receivedReqData) {
      setReceivedReqData(
        receivedReqData.filter((item) => item.id != deletedReq.reqId),
      )
    }
    if (sentReqData) {
      setSentReqData(sentReqData.filter((item) => item.id != deletedReq.reqId))
    }
  }, [socket.deletedReq, jwt])

  function exitModal() {
    setShowRequestsModal(false)
  }

  const sent = sentRequestsFetch.loading ? (
    <p>Loading</p>
  ) : sentRequestsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : sentRequestsFetch.data ? (
    sentReqData.map((req) => {
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
    receivedReqData.map((req) => {
      return <FollowRequest user={req.sender} isSent={false} id={req.id} />
    })
  ) : (
    <p>Nothing here</p>
  )

  return (
    <div
      className={`${styles.modalcontainer} ${
        showRequestsModal ? '' : styles.modalhidden
      }`}
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
