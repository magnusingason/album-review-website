import Navbar from '@components/Navbar';
import React, { useState } from 'react';
import styles from '../styles/createreview.module.css'
import { useRouter } from 'next/router';

function CreateReview() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [rating, setRating] = useState('');
  const [summary, setSummary] = useState('');
  const [picture, setPicture] = useState('');
  const router = useRouter();

  const handleSubmit = event => {
    event.preventDefault();
    let data = {
      "title": title,
      "Artist": artist,
      "rating": rating,
      "summary": summary,
      "picture": picture
    }
    const obj = JSON.parse(JSON.stringify(data));

    console.log(summary)

    fetch('http://localhost:3000/api/addalbum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
  
    router.push('/')
    
  };

  return (
    <div>
    <Navbar />
    <div className={styles.whole_wrapper}>
    <div className={styles.create_container}>
    <form onSubmit={handleSubmit} className={styles.create_form}>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
            />
          </label>
          </div>
          <div className={styles.box}>
          <label>
            Artist:
            <input
              type="text"
              value={artist}
              onChange={event => setArtist(event.target.value)}
              required
            />
          </label>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.box}>
        <label>
          Rating (1-10):
          <input
            type="text"
            value={rating}
            onChange={event => setRating(event.target.value)}
            required
            pattern="[1-9]|10"
          />
        </label>
        </div>
        <div className={styles.box}>
        <label>
          URL for a picture :
          <input
            type="text"
            value={picture}
            onChange={event => setPicture(event.target.value)}
            required
            pattern="https?://.+"
          />
        </label>
        </div>
      </div>
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
      </div>
      <button type="submit" className={styles.create_button} >Submit</button>
    </form>
    </div>
    </div>
    </div>
  );
}

export default CreateReview;