import Post from '../../../../components/post/post'
import LeftMenu from '../../../../components/menu/leftmenu/menu'
import RightMenu from '../../../../components/menu/rightmenu/menu'
import styles from './homepage.module.css'
import NewItemModal from '../../components/newitemmodal/newitem'
import { useEffect, useState } from 'react'
import useData from '../../../../utils/useData'
import PostEmbed from '../../../../components/post/components/postembed'
import Comment from '../../../../components/comment/comment'

export default function Home() {
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
