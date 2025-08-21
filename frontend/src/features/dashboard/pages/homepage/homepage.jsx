import Post from '../../../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useEffect, useState } from 'react'
import useData from '../../../../utils/useData'
import PostEmbed from '../../../../components/post/components/postembed'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const getPostsFetch = useData('/posts', 'GET')

  useEffect(() => {
    getPostsFetch.fetchData()
  }, [])

  const posts = getPostsFetch.loading ? (
    <p>Loading</p>
  ) : getPostsFetch.error != null ? (
    <p>An unknown error occured</p>
  ) : getPostsFetch.data ? (
    getPostsFetch.data.data.map((post) => {
      console.log(post)
      return (
        <Post text={post.text} author={post.author} date={post.createdAt}>
          <PostEmbed />
        </Post>
      )
    })
  ) : (
    ''
  )

  return (
    <>
      <NewItemModal showModal={showModal} setShowModal={setShowModal} />
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
