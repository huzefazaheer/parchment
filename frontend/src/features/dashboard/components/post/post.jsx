import { useNavigate } from 'react-router-dom'
import postTime from './getposttime'
import styles from './post.module.css'
import { useContext, useEffect } from 'react'
import useData from '../../../../utils/useData'
import { appContext, socketContext } from '../../../../App'
import { useState } from 'react'

export default function Post({
  id,
  children,
  text,
  author,
  date,
  isLiked = false,
  isReshared = false,
}) {
  const { user } = useContext(appContext)
  const createdAt = new Date(date)
  const now = new Date()
  const time = now - createdAt
  const postLikesFetch = useData('/posts/' + id + '/likes', 'GET')
  const postCommentsFetch = useData('/posts/' + id + '/commentscount', 'GET')
  const postReshareFetch = useData('/posts/' + id + '/reshares', 'GET')
  const postLikesPostFetch = useData('/posts/' + id + '/likes', 'POST', {
    id: user?.id,
  })
  const postResharePostFetch = useData('/posts/' + id + '/reshares', 'POST', {
    id: user?.id,
  })
  const socket = useContext(socketContext)
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ likes: 0, comments: 0, reshares: 0 })

  useEffect(() => {
    if (socket.updatedPost == null || socket.updatedPost.postId != id) return
    switch (socket.updatedPost.type) {
      case 'like':
        setCounts({ ...counts, likes: socket.updatedPost.count })
        break
      case 'comment':
        setCounts({ ...counts, comments: counts.comments + 1 })
        break
      case 'reshare':
        setCounts({ ...counts, reshares: socket.updatedPost.count })
        break
    }
  }, [socket.updatedPost])

  useEffect(() => {
    async function getData() {
      const d1 = await postLikesFetch.fetchData()
      const d2 = await postCommentsFetch.fetchData()
      const d3 = await postReshareFetch.fetchData()
      setCounts({
        likes: d1.data[0]._count.likedBy,
        comments: d2.data[0]._count.comments,
        reshares: d3.data[0]._count.resharedBy,
      })
    }
    getData()
  }, [])

  function postClick() {
    navigate('/posts/' + id)
  }

  function goToProfile() {
    navigate('/profile/' + author.id)
  }

  async function likePost() {
    const { data } = await postLikesPostFetch.fetchData()
    socket.postUpdate(id, 'like', data._count.likedBy)
  }

  async function resharePost() {
    const { data } = await postResharePostFetch.fetchData()
    socket.postUpdate(id, 'reshare', data._count.resharedBy)
  }

  return (
    <article key={id} className={styles.post} onClick={postClick}>
      <img
        className={styles.profilephoto}
        src={author?.photo ? author.photo : '/exampleprofile.png'}
        alt=""
      />

      <div className={styles.right}>
        <div>
          <p
            className={styles.header}
            onClick={(e) => {
              e.stopPropagation()
              goToProfile()
            }}
          >
            <span className={styles.displayname}>{author.displayName}</span>
            <span className={styles.username}>@{author.username}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.time}>{postTime(time)}</span>
          </p>
          <p className={styles.text}>{text}</p>
        </div>

        {children}

        <ul>
          <li>
            <img
              src="/star.svg"
              alt=""
              onClick={(e) => {
                e.stopPropagation()
                likePost()
              }}
            />
            <p>{counts.likes}</p>
          </li>
          <li>
            <img src="/comment.svg" alt="" />
            <p>{counts.comments}</p>
          </li>
          <li>
            <img
              src="/repost.svg"
              alt=""
              onClick={(e) => {
                e.stopPropagation()
                resharePost()
              }}
            />
            <p>{counts.reshares}</p>
          </li>
        </ul>
      </div>
    </article>
  )
}
