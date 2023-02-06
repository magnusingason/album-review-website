import styles from '../../styles/createuser.module.css'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link'




function CreatePage() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [taken, setTaken] = useState(false);
    const router = useRouter();
  
    const  handleSubmit = async event => {
      event.preventDefault();
      let data = {
        "username": username,
        "password": password
      }
      const obj = JSON.parse(JSON.stringify(data));
  
      let response
      let res
      if(process.env.NODE_ENV == 'development'){
        response = await fetch('http://localhost:3000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then(
        response =>{

         return response.json();
        }
      )
    }
    if(process.env.NODE_ENV == 'production'){
      response = await fetch('https://album-review-website.herokuapp.com/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then(
         response =>{

         return response.json();
        }
      )
    }

    console.log(response.error)
    
    if(response.error === "username has been taken"){
      setTaken(true);
    }else{
      router.push('/')
    }

      
    };

    return (
        <div>
        <Navbar />
        <div className={styles.whole_wrapper}>
        <div className={styles.create_container}>
        <form onSubmit={handleSubmit} className={styles.create_form}>
        <div className={styles.title}>
                Create a new account:
        </div>
        <div className={styles.infotext}>
          Username and password needs to be at least 5 characters.
        </div>
          <div className={styles.wrapper}>
            <div className={styles.box}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  required
                  minLength={5}
                />
              </label>
              </div>
              <div className={styles.box}>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                  minLength={5}
                />
              </label>
            </div>
            <div className={styles.takentext}>
              
              {//taken is a state which is true if the user has attempted to create an account where the username is taken. this text should be empty if taken = false
              taken ? 
                "username has been taken" : ""
              }
            </div>
          </div>
          <button type="submit" className={styles.create_button} >Submit</button>
          <div className={styles.createacclink}>
          <Link legacyBehavior href="/login">
            <a className={styles.createlink}>Already have an account? Click here to log in!</a>
          </Link>
          </div>
        </form>
        </div>
        
        </div>
        </div>
      );
}

export default CreatePage;