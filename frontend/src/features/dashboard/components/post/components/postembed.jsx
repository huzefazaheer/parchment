import { useEffect, useState } from 'react'
import styles from './postembed.module.css'
import truncateWords from './textutils'
import useData from '../../../../../utils/useData'
import PostSkeleton from '../skeleton/postskeleton'
import EmbedSkeleton from './skeleton/embedskeleton'

export default function PostEmbed({ url }) {
  const embedFetch = useData('/embed', 'GET')
  const [hidden, setHidden] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
  })
  useEffect(() => {
    async function getEmbed() {
      const data = await embedFetch.fetchData('/embed?url=' + url)
      if (data.success) {
        setData(data.data)
      } else setHidden(true)
    }
    getEmbed()
  }, [])

  const hostname =
    data.url != '' ? new URL(data.url).hostname : 'www.example.co'

  function openLink(e) {
    e.stopPropagation()
    window.open(url, '_blank')
  }

  return embedFetch.loading ? (
    <EmbedSkeleton />
  ) : hidden ? (
    <p onClick={(e) => openLink(e)} className={styles.fallbacklink}>
      {url}
    </p>
  ) : (
    <aside
      className={styles.embed}
      key={crypto.randomUUID}
      onClick={(e) => openLink(e)}
    >
      <img className={styles.emded_img} src={data.image}></img>
      <div className={styles.textwrapper}>
        <p className={styles.embed_text}>{data.title}</p>
        <p className={styles.link_text}>
          {truncateWords(data.description, 30)}
        </p>
        <div className={styles.linkwrapper}>
          <img src="/web.svg" alt="" />
          <p className={styles.link}>{hostname.replace(/^www\./i, '')}</p>
        </div>
      </div>
    </aside>
  )
}
