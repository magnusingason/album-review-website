import fetch from 'node-fetch';
import styles from '../styles/index.module.css'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { InferGetServerSidePropsType } from 'next'
import { getAlbums } from '@lib/album'
import { useRouter } from 'next/router'
import Navbar from '@components/Navbar';

export const getServerSideProps: GetServerSideProps<{ data }> = async (context) => {
  console.log(process.env.NODE_ENV)
  let res
  if(process.env.NODE_ENV == 'development'){
    res = await fetch('http://localhost:3000/api/albums');
  }
  if(process.env.NODE_ENV == 'production'){
    res = await fetch('https://album-review-website.herokuapp.com/api/albums');
  }
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let albums = data.albums
  const router = useRouter()
  return (
    <div>
      <Navbar />
   <div className={styles.container}>
      {albums.map((item) => (
        <div key={item._id}>
          <a onClick={() => router.push({
      pathname: `/${item._id}`,
      query: { id: item._id }
    })}>
          <div className={styles.album_card}>
            <img src={item.picture} className={styles.card_image} />
            <div className={styles.card_flex}>
              <div className={styles.card_na}>
                <h1 className={styles.card_title}>{item.title}</h1>
                <h2 className={styles.card_artists}>{item.Artist}</h2>
              </div>
              <div>
              <p className={styles.card_rating}>{item.rating}</p>
              </div>
            </div>
          </div>
          </a>
        </div>
    ))}
    </div>
    </div>
  )
}
