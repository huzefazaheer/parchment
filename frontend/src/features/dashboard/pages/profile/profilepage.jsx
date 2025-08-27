import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './profilepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../../../App'
import useData from '../../../../utils/useData'
import Post from '../../components/post/post'
import Comment from '../../components/comment/comment'
import ProfileHeader from './components/profileheader/profileheader'
import CommentSkeleton from '../../components/comment/skeleton/commentskeleton'
import PostSkeleton from '../../components/post/skeleton/postskeleton'

export default function ProfilePage() {
  const [index, setIndex] = useState(0)
  const { id } = useParams()
  const { user } = useContext(appContext)

  let userId
  if (id == undefined) {
    userId = user.id
  } else userId = id

  const itemFetch = useData('/user/' + userId + '/posts', 'GET')

  useEffect(() => {
    switch (index) {
      case 0:
        itemFetch.fetchData('/user/' + userId + '/posts')
        break
      case 1:
        itemFetch.fetchData('/user/' + userId + '/comments')
        break
      case 2:
        itemFetch.fetchData('/user/' + userId + '/reshares')
        break
    }
  }, [index])

  const posts = itemFetch.loading ? (
    <div>
      <PostSkeleton />
      <PostSkeleton />
    </div>
  ) : itemFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : itemFetch.data ? (
    itemFetch.data.data.map((post) => {
      return (
        <Post
          id={post.id}
          text={post.text}
          author={post.author}
          date={post.createdAt}
        ></Post>
      )
    })
  ) : (
    <p>Nothing here</p>
  )

  const comments = itemFetch.loading ? (
    <div>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  ) : itemFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : itemFetch.data ? (
    itemFetch.data.data.map((comment) => {
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
    <p>Nothing here</p>
  )

  return (
    <>
      <NewItemModal />
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.profile}>
          <ProfileHeader
            id={id}
            index={index}
            setIndex={setIndex}
            userId={userId}
          />
          <div>{index == 0 ? posts : index == 1 ? comments : posts}</div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
