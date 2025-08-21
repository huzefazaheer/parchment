import styles from './newitem.module.css'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { useContext } from 'react'
import { appContext } from '../../../../App'

export default function NewItemModal() {
  const { showModal, setShowModal } = useContext(appContext)

  function exitModal() {
    setShowModal(false)
  }

  return (
    <div
      className={`${styles.modalcontainer} ${
        showModal ? '' : styles.modalhidden
      }`}
    >
      <div className={styles.modal}>
        <div className={styles.top}>
          <img src="/exampleprofile.png" alt="" />
          <div className={styles.right}>
            <textarea
              name=""
              id=""
              placeholder="Share your thoughts"
            ></textarea>
          </div>
        </div>
        <div className={styles.control}>
          <SecondaryButton width="100px" onClick={exitModal}>
            Cancel
          </SecondaryButton>
          <PrimaryButton width="100px">Post</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
