import { useNavigate } from 'react-router-dom'
import styles from './comment.module.css'
import commentTime from './getcommenttime'
import { useContext, useEffect } from 'react'
import useData from '../../../../utils/useData'
import { appContext } from '../../../../App'

export default function Comment({ id, text, author, date, isLiked = false }) {
  const { user } = useContext(appContext)
  const createdAt = new Date(date)
  const now = new Date()
  const time = now - createdAt
  const commentLikesFetch = useData('/comments/' + id + '/likes', 'GET')
  const commentLikesPostFetch = useData('/comments/' + id + '/likes', 'POST', {
    id: user?.id,
  })

  const navigate = useNavigate()

  useEffect(() => {
    commentLikesFetch.fetchData()
  }, [])

  function goToProfile() {
    navigate('/profile/' + author.id)
  }

  async function likeComment() {
    await commentLikesPostFetch.fetchData()
  }

  return (
    <article className={styles.comment} key={id}>
      <img
        onClick={goToProfile}
        className={styles.profilephoto}
        src={author?.photo ? author.photo : '/exampleprofile.png'}
        alt=""
      />

      <div className={styles.right}>
        <div onClick={goToProfile}>
          <p className={styles.header}>
            <span className={styles.displayname}>{author.displayName}</span>
            <span className={styles.username}>@{author.username}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.time}>{commentTime(time)}</span>
          </p>
          <p className={styles.text}>{text}</p>
        </div>

        {user != null ? (
          <ul>
            <li>
              <img src="/star.svg" alt="" onClick={likeComment} />
              <p>
                {commentLikesFetch?.data
                  ? commentLikesFetch.data.data[0]._count.likedBy
                  : '0'}
              </p>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
    </article>
  )
}
