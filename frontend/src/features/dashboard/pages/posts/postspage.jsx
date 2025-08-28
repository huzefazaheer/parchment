import Post from '../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './postpage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useContext, useEffect } from 'react'
import useData from '../../../../utils/useData'

import { useNavigate, useParams } from 'react-router-dom'
import { appContext, socketContext } from '../../../../App'
import Comment from '../../components/comment/comment'
import PostSkeleton from '../../components/post/skeleton/postskeleton'
import CommentSkeleton from '../../components/comment/skeleton/commentskeleton'
import { useState } from 'react'
import PostEmbed from '../../components/post/components/postembed'

export default function PostsPage() {
  const { setShowModal } = useContext(appContext)
  const { id } = useParams()
  const getPostFetch = useData('/posts/' + id, 'GET')
  const getCommentFetch = useData('/posts/' + id + '/comments', 'GET')
  const navigate = useNavigate()
  const [commentData, setCommentData] = useState([])
  const socket = useContext(socketContext)

  useEffect(() => {
    async function getData() {
      getPostFetch.fetchData()
      const { data } = await getCommentFetch.fetchData()
      setCommentData(data)
    }
    getData()
    socket.openPost(id)
  }, [])

  useEffect(() => {
    if (socket.newComment == null) return

    const comment = socket.newComment
    setCommentData([
      ...commentData,
      {
        id: comment.comment.id,
        text: comment.comment.text,
        createdAt: comment.comment.createdAt,
        author: {
          id: comment.user.id,
          displayName: comment.user.displayName,
          username: comment.user.username,
          photo: comment.user.photo,
        },
      },
    ])
  }, [socket.newComment])

  const post = getPostFetch.loading ? (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <PostSkeleton />
    </div>
  ) : getPostFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getPostFetch.data ? (
    <Post
      id={getPostFetch.data.data.id}
      text={getPostFetch.data.data.text}
      author={getPostFetch.data.data.author}
      date={getPostFetch.data.data.createdAt}
    >
      {getPostFetch.data.data.post_embed &&
      getPostFetch.data.data.post_embed.type === 'link' ? (
        <PostEmbed url={getPostFetch.data.data.post_embed.value} />
      ) : null}
    </Post>
  ) : (
    ''
  )

  const comments = getCommentFetch.loading ? (
    <div>
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  ) : getCommentFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getCommentFetch.data ? (
    commentData.map((comment) => {
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
