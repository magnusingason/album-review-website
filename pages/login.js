import styles from '../styles/createuser.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react';



function CreatePage() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [wrong, setWrong] = useState(false);
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
        response = await fetch(`http://localhost:3000/api/getuser/${username}`, {
        method: 'GET'
      }).then(
        response =>{

         return response.json();
        }
      )
    }
    if(process.env.NODE_ENV == 'production'){
      response = await fetch(`https://album-review-website.herokuapp.com/api/getuser/${username}`, {
        method: 'GET'
            }).then(
         response =>{

         return response.json();
        }
      )
    }

    console.log(response)
    
    if(response.username === username && response.password === password){
      router.push('/')
    }else{
      setWrong(true);

    }

      
    };

    return (
        <div>
        <Navbar />
        <div className={styles.whole_wrapper}>
        <div className={styles.create_container}>
        <form onSubmit={handleSubmit} className={styles.create_form}>
        <div className={styles.title}>
                Log in
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
                />
              </label>
            </div>
            <div className={styles.takentext}>
              
              {// wrong is a state which is flase if never attempted wrong acc and true if user has attempted wrong acc. conditionally will create text
              wrong ? 
                "wrong username or password" : ""
              }
            </div>
          </div>
          <button type="submit" className={styles.create_button} >Submit</button>
          <div className={styles.createacclink}>
          <Link legacyBehavior href="/createacc">
            <a className={styles.createlink}>create account</a>
          </Link>
        </div>
        </form>
        
        </div>
        </div>
        </div>
      );
}

export default CreatePage;