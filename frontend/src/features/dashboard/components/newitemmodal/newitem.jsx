import styles from './newitem.module.css'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { useContext, useState } from 'react'
import { appContext } from '../../../../App'
import useData from '../../../../utils/useData'

export default function NewItemModal() {
  const { showModal, setShowModal } = useContext(appContext)
  const [text, setText] = useState('')
  const createPostFetch = useData('/posts', 'POST', { text })

  function exitModal() {
    setShowModal(false)
  }

  async function createPost() {
    console.log(await createPostFetch.fetchData())
    exitModal()
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
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
        </div>
        <div className={styles.control}>
          <SecondaryButton width="100px" onClick={exitModal}>
            Cancel
          </SecondaryButton>
          <PrimaryButton width="100px" onClick={createPost}>
            Post
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
