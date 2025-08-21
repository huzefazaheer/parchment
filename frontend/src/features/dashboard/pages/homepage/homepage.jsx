import PostEmbed from '../../../../components/post/components/postembed'
import Post from '../../../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useState } from 'react'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <NewItemModal showModal={showModal} setShowModal={setShowModal} />
      <div className={styles.body}>
        <LeftMenu />
        <div className={styles.posts}>
          <h4 className={styles.topheading}>Discover</h4>
          <div>
            <Post>
              <PostEmbed />
            </Post>
            <Post></Post>
            <Post>
              <PostEmbed />
            </Post>
          </div>
        </div>
        <RightMenu />
      </div>
    </>
  )
}
