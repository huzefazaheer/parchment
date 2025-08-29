import Post from '../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useEffect, useRef } from 'react'
import useData from '../../../../utils/useData'
import PostSkeleton from '../../components/post/skeleton/postskeleton'
import { useContext } from 'react'
import { appContext, socketContext } from '../../../../App'
import { useState } from 'react'
import PostEmbed from '../../components/post/components/postembed'
import handleScroll from '../../../../utils/scroll'

export default function Home() {
  const [index, setIndex] = useState(0)
  const getPostsFetch = useData('/posts', 'GET')
  const getFollowingPostsFetch = useData('/user/posts/following', 'GET')
  const { user, jwt } = useContext(appContext)
  const socket = useContext(socketContext)
  const [postData, setPostData] = useState([])

  useEffect(() => {
    const scroll = handleScroll()
    return scroll
  }, [])

  useEffect(() => {
    if (!user || !jwt) return
    async function getData() {
      if (index == 0) {
        const { data } = await getPostsFetch.fetchData()
        setPostData(data)
      } else {
        const { data } = await getFollowingPostsFetch.fetchData()
        setPostData(data)
      }
    }
    getData()
  }, [user, jwt, index])

  useEffect(() => {
    if (socket.newPost == null) return
    const post = socket.newPost
    setPostData([
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
        post_embed: post.data.post_embed,
      },
      ...postData,
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
        >
          {post.post_embed && post.post_embed.type === 'link' ? (
            <PostEmbed url={post.post_embed.value} />
          ) : null}
        </Post>
      )
    })
  ) : (
    ''
  )

  return (
    <>
      <LeftMenu />
      <div className={`${styles.posts} scroll`}>
        <h4 className={styles.topheading}>
          <span
            onClick={() => setIndex(0)}
            className={index == 0 ? styles.active : ''}
          >
            Discover
          </span>
          <span
            onClick={() => setIndex(1)}
            className={index == 1 ? styles.active : ''}
          >
            Following
          </span>
        </h4>
        <div className={styles.postwrapper}>{posts}</div>
      </div>
      <RightMenu />
    </>
  )
}
