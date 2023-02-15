import Navbar from '@components/Navbar';
import React, { useState } from 'react';
import styles from '../styles/review_id.module.css'
import { useRouter, useEffect } from 'next/router';
import {useUser} from '@auth0/nextjs-auth0/client'
import Head from 'next/head'
import { withRouter } from 'next/router'

function CreateReview({props}) {
  const router = useRouter();
  const { song, artist, picture } = router.query
  
  console.log(song)
  const {user, error, isLoading} = useUser()

  const [rating, setRating] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if(user){
    let data = {
      "title": song,
      "Artist": artist,
      "rating": rating,
      "summary": summary,
      "picture": picture,
      "user": user.nickname
    }
    const obj = JSON.parse(JSON.stringify(data));


    let res

  if(process.env.NODE_ENV == 'development'){
    fetch('http://localhost:3000/api/addalbum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
  }
  if(process.env.NODE_ENV == 'production'){
    fetch('https://album-review-website.herokuapp.com/api/addalbum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
  }
  
    router.push('/')
}else{
  alert("You need to log in before you create a review.")
}

  };

  return (
    <div>      
      <Head>
          <title>Review Page</title>
      </Head>
      <Navbar />
      <div className={styles.upper_wrapper}>
          <div className={styles.box1}>
              <a className={styles.title}> {song}</a>
              <a className={styles.artist}>{artist}</a>
          </div>
          <div className={styles.box}>
              <div className={styles.image}>
                  <img src={picture}></img>
              </div>
          </div>
      </div>
        <form onSubmit={handleSubmit} className={styles.create_form}>
        {user ? <div></div> : <div className={styles.flagger}>Need to be logged in to create review </div>}
        <div className={styles.create_summary}>
          <label>
          Write here a little explanation for the album rating:
          <textarea
            type="textarea"
            value={summary}
            onChange={event => setSummary(event.target.value)}
            required
          />
          </label>
          <div className={styles.box}>
          <label>
              Rating (1-10):
              <input
                type="text"
                className={styles.review_rating_input}
                value={rating}
                onChange={event => setRating(event.target.value)}
                required
                pattern="[1-9]|10"
              />
            </label>
        </div>
      </div>
      <button type="submit" className={styles.create_button} >Submit</button>
    </form>
    </div>
  );
}

export default CreateReview;