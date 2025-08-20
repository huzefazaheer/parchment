import PostEmbed from '../../../../components/post/components/postembed'
import Post from '../../../../components/post/post'
import LeftMenu from '../../components/leftmenu/menu'
import RightMenu from '../../components/rightmenu/menu'
import styles from './homepage.module.css'

export default function Home() {
  return (
    <>
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
