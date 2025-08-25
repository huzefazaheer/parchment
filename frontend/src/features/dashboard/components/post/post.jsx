import { useNavigate } from 'react-router-dom'
import postTime from './getposttime'
import styles from './post.module.css'
import { useContext, useEffect } from 'react'
import useData from '../../../../utils/useData'
import { appContext } from '../../../../App'

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
    id: user.id,
  })
  const postResharePostFetch = useData('/posts/' + id + '/reshares', 'POST', {
    id: user.id,
  })

  const navigate = useNavigate()

  useEffect(() => {
    postLikesFetch.fetchData()
    postCommentsFetch.fetchData()
    postReshareFetch.fetchData()
  }, [])

  function postClick() {
    navigate('/posts/' + id)
  }

  function goToProfile() {
    navigate('/profile/' + author.id)
  }

  async function likePost() {
    await postLikesPostFetch.fetchData()
  }

  async function resharePost() {
    console.log(await postResharePostFetch.fetchData())
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
            <p>
              {postLikesFetch?.data
                ? postLikesFetch.data.data[0]._count.likedBy
                : '0'}
            </p>
          </li>
          <li>
            <img src="/comment.svg" alt="" />
            <p>
              {postCommentsFetch?.data
                ? postCommentsFetch.data.data[0]._count.comments
                : '0'}
            </p>
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
            <p>
              {postReshareFetch?.data
                ? postReshareFetch.data.data[0]._count.resharedBy
                : '0'}
            </p>
          </li>
        </ul>
      </div>
    </article>
  )
}
