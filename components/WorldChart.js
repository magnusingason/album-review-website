import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/chart.module.css'

const WorldChart = () => {
  const [data, setData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', {
        method: 'GET', 
        headers: {
          'X-RapidAPI-Key': '49c5c6a66amsh9ddf3178d0ef3c1p1864dfjsnc6622c9b293b',
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
        }})
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.world_title}>
        <p>Top 50 World Chart</p>
      </div>
      <div className={styles.container}>
      {data.map((item, index) => (
        <div key={index}>
          <a >
          <div className={styles.album_card}>
            <div className={styles.image_block}>
              <img src={item.images !== undefined ? item.images.coverart : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"} className={styles.card_image} />
              <div className={styles.card_flex}>
                <div className={styles.artist_name}>
                  <h2 className={styles.card_artists}>#{index+1} {item.title}</h2>
                </div>
                <h3>{item.subtitle}</h3>
                <div className={styles.button_rating_box}>
                  <button type="button"onClick={() => router.push({
                      pathname: `/createreview`,
                      query: { song: item.title , artist: item.subtitle, picture: item.images.coverart}
                      })} >create review</button>
                </div>
              </div>
            </div>
          </div>
          </a>
        </div>
    ))}
    </div>
    </div>
  );
};

export default WorldChart;
