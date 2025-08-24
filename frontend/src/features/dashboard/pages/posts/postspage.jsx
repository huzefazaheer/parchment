import Post from '../../../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './postpage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useContext, useEffect } from 'react'
import useData from '../../../../utils/useData'

import { useNavigate, useParams } from 'react-router-dom'
import { appContext } from '../../../../App'
import Comment from '../../../../components/comment/comment'

export default function PostsPage() {
  const { setShowModal } = useContext(appContext)
  const { id } = useParams()
  const getPostFetch = useData('/posts/' + id, 'GET')
  const getCommentFetch = useData('/posts/' + id + '/comments', 'GET')
  const navigate = useNavigate()

  useEffect(() => {
    getPostFetch.fetchData()
    getCommentFetch.fetchData()
  }, [])

  const post = getPostFetch.loading ? (
    <p>Loading</p>
  ) : getPostFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getPostFetch.data ? (
    <Post
      id={getPostFetch.data.data.id}
      text={getPostFetch.data.data.text}
      author={getPostFetch.data.data.author}
      date={getPostFetch.data.data.createdAt}
    ></Post>
  ) : (
    ''
  )

  const comments = getCommentFetch.loading ? (
    <p>Loading</p>
  ) : getCommentFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getCommentFetch.data ? (
    getCommentFetch.data.data.map((comment) => {
      return (
        <Comment
          id={comment.id}
          text={comment.text}
          author={comment.author}
          date={comment.createdAt}
        ></Comment>
      )
    })
  ) : (
    ''
  )

  return (
    <>
      <NewItemModal />
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.posts}>
          <div className={styles.topheading}>
            <img onClick={() => navigate('/')} src="/backarrow.svg" alt="" />
            <h4>Comments</h4>
          </div>
          <div>{post}</div>
          <button
            className={styles.addcomment}
            onClick={() => setShowModal({ show: true, type: 'comment' })}
          >
            Leave a comment
          </button>
          <div>{comments}</div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
