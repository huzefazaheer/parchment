import Post from '../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useEffect } from 'react'
import useData from '../../../../utils/useData'
import PostSkeleton from '../../components/post/skeleton/postskeleton'
import { useContext } from 'react'
import { appContext, socketContext } from '../../../../App'
import { useState } from 'react'

export default function Home() {
  const getPostsFetch = useData('/posts', 'GET')
  const { user, jwt } = useContext(appContext)
  const socket = useContext(socketContext)
  const [postData, setPostData] = useState([])

  useEffect(() => {
    if (!user || !jwt) return
    async function getData() {
      const { data } = await getPostsFetch.fetchData()
      setPostData(data)
    }
    getData()
  }, [user, jwt])

  useEffect(() => {
    if (socket.newPost == null) return
    const post = socket.newPost
    setPostData([
      ...postData,
      {
        id: post.data.id,
        text: post.data.text,
        createdAt: post.data.date_published,
        author: {
          id: post.user.id,
          username: post.user.username,
          displayName: post.user.displayName,
          photo: post.user.photo,
        },
      },
    ])
  }, [socket.newPost])

  const posts = getPostsFetch.loading ? (
    <div>
      <PostSkeleton />
      <PostSkeleton />
    </div>
  ) : getPostsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getPostsFetch.data ? (
    postData.map((post) => {
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
