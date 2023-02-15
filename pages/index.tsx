import fetch from 'node-fetch';
import styles from '../styles/index.module.css'
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '@components/Navbar';
import { useState, useEffect } from 'react';
import Footer from '@components/Footer';
import WorldChart from '@components/WorldChart';
import classNames from "classnames";



export const getServerSideProps: GetServerSideProps<{ data }> = async (context) => {
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
      data
    },
  };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let albums = data.albums
  const router = useRouter()
  const handleRightClick = () => {
    setClicked(true);
  };

  const handleLeftClick = () => {
    setClicked(false);
  };

  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <div>
      <Head>
        <title>Music Review</title>
      </Head>
      <Navbar />
      <div className={styles.switch_container}>
        <div className={classNames({[styles["left"]]: !clicked,
                        [styles["not-left"]]: clicked})}
        role="button"
        tabIndex={0}
        onClick={handleLeftClick} >
          <a>Music to Review</a>
        </div>
        <div className={classNames({[styles["left"]]: clicked,
                        [styles["not-left"]]: !clicked})}
        role="button"
        tabIndex={0}
        onClick={handleRightClick}
        >
          <a>Music Already Reviewed</a>
        </div>
      </div>
  {clicked ? 
   <div className={styles.container}>
      {albums.map((item) => (
        <div key={item._id}>
          <a >
          <div className={styles.album_card}>
            <div className={styles.image_block}>
              <h1 className={styles.card_title}>{item.title}</h1>
              <img src={item.picture} className={styles.card_image} />
              <div className={styles.card_flex}>
                <h2 className={styles.card_artists}>{item.Artist}</h2>
                <p className={styles.summary}>{item.summary}</p>
                <div className={styles.button_rating_box}>
                  <div>
                    <p className={styles.card_rating}>{item.rating}</p>
                  </div>
                  <div>
                    <button onClick={() => router.push({
                      pathname: `/${item._id}`,
                      query: { id: item._id }
                      })}>Read Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </a>
        </div>
    ))}
    </div>
 : <WorldChart />}
    <Footer />
    </div>
  )
}
