import { useState, useEffect } from 'react';
import React from 'react';
import styles from '../styles/chart.module.css'
import { useRouter } from 'next/router'

const SongQuery = ({query}) => {
  const [data, setData] = useState([]);
  const router = useRouter()

  const url = 'https://shazam-core.p.rapidapi.com/v1/search/multi';
  const params = {
    search_type: 'SONGS',
    query: query
  };
  const queryParams = new URLSearchParams(params).toString();
  const requestUrl = `${url}?${queryParams}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(requestUrl, {
        method: 'GET', 
        headers: {
          'X-RapidAPI-Key': '49c5c6a66amsh9ddf3178d0ef3c1p1864dfjsnc6622c9b293b',
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
        }
    })
      const json = await res.json();
      if( json.tracks !== undefined){
        setData(json.tracks.hits);
      }else{
        setData(undefined)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    {data !== undefined ? 
    <div className={styles.container}>
      {data.map((item, index) => (
        <div key={index}>
          <a >
          <div className={styles.album_card}>
            <div className={styles.image_block}>
              <img src={item.track.images !== undefined ? item.track.images.coverart  : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"} className={styles.card_image} />
              <div className={styles.card_flex}>
                <div className={styles.artist_name}>
                  <h2 className={styles.card_artists}> {item.track.title}</h2>
                </div>
                <h3>{item.track.subtitle}</h3>
                <div className={styles.button_rating_box}>
                  <button type="button" onClick={() => router.push({
                      pathname: `/createreview`,
                      query: { song: item.track.title , artist: item.track.subtitle, picture: item.track.images.coverart}
                      })}>create review</button>
                </div>
              </div>
            </div>
          </div>
          </a>
        </div>
    ))}
    </div> : <div className={styles.button_rating_box}> No results found. </div>}

    </div>
  );
};

export default SongQuery;
