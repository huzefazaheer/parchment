import styles from './newitem.module.css'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../../components/ui/buttons/buttons'
import { useContext, useEffect, useState } from 'react'
import { appContext, socketContext } from '../../../../App'
import useData from '../../../../utils/useData'
import { useLocation } from 'react-router-dom'
import getLink, { removeLinks } from './getlink'

export default function NewItemModal() {
  const { showModal, setShowModal } = useContext(appContext)
  const [text, setText] = useState('')
  const createPostFetch = useData('/posts', 'POST', {})
  const createCommentFetch = useData('/comments?postid=', 'POST', { text })
  const { user } = useContext(appContext)
  const socket = useContext(socketContext)

  const location = useLocation()

  function exitModal() {
    setText('')
    setShowModal((prev) => ({ ...prev, show: false }))
  }

  async function createPost() {
    let embed = ''
    const link = getLink(text)
    if (link != null) embed = { type: 'link', value: link }
    const postText = removeLinks(text)
    console.log(postText)
    const { data } = await createPostFetch.fetchData(undefined, {
      text: postText,
      post_embed: embed,
    })
    socket.createPost(data, user)
    exitModal()
  }

  async function createComment() {
    const postId = location.pathname.split('/')[2]
    const { data } = await createCommentFetch.fetchData(
      '/comments?postid=' + postId,
    )
    socket.createComment(data, user, postId)
    socket.postUpdate(postId, 'comment', 1)
    exitModal()
  }

  return (
    <div
      className={`${styles.modalcontainer} ${
        showModal.show ? '' : styles.modalhidden
      }`}
    >
      <div className={styles.modal}>
        <div className={styles.top}>
          <img src={user?.photo} alt="" />
          <div className={styles.right}>
            <textarea
              name=""
              id=""
              placeholder={
                showModal.type == 'post'
                  ? 'Tell a story'
                  : 'Share your thoughts'
              }
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
        </div>
        <div className={styles.control}>
          <SecondaryButton width="100px" height="40px" onClick={exitModal}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            width="100px"
            height="40px"
            onClick={showModal.type == 'post' ? createPost : createComment}
          >
            {showModal.type == 'post' ? 'Post' : 'Comment'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
