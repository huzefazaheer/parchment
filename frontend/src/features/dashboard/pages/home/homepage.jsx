import Post from '../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useEffect } from 'react'
import useData from '../../../../utils/useData'
import PostSkeleton from '../../components/post/skeleton/postskeleton'
import { useContext } from 'react'
import { appContext } from '../../../../App'

export default function Home() {
  const getPostsFetch = useData('/posts', 'GET')
  const { user, jwt } = useContext(appContext)

  useEffect(() => {
    if (!user || !jwt) return
    getPostsFetch.fetchData()
  }, [user, jwt])

  const posts = getPostsFetch.loading ? (
    <div>
      <PostSkeleton />
      <PostSkeleton />
    </div>
  ) : getPostsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getPostsFetch.data ? (
    getPostsFetch.data.data.map((post) => {
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
    ''
  )

  return (
    <>
      <NewItemModal />
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.posts}>
          <h4 className={styles.topheading}>Discover</h4>
          <div>{posts}</div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
