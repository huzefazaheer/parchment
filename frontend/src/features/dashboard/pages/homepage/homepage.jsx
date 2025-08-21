import PostEmbed from '../../../../components/post/components/postembed'
import Post from '../../../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useEffect, useState } from 'react'
import useData from '../../../../utils/useData'

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
    getPostsFetch.data.data.map((post) => <Post text={post.text} />)
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
