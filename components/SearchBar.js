import { useState } from 'react';
import styles from '../styles/navbar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(router.pathname)
    if (router.pathname == '/search/results'){
      router.push({ pathname: router.pathname, query: { query: query } })
      router.reload(window.location.pathname)
    }
      if (!query){
        router.push({
          pathname: `/search/results/`,
          query: { query: '' }
        })
      }else{
      router.push({
        pathname: `/search/results/`,
        query: { query: query }
      })
    }
  }
  return (
    <div className={styles.search_container}>
      <form onSubmit={handleSubmit} className={styles.search_bar}>
        <input type="text" value={query} placeholder="Search For Music To Review" onChange={handleChange} className={styles.search_input} required/>
        <button className={styles.search_button} type="submit"> <img src="https://img.icons8.com/ios/256/search--v1.png" alt="me" /></button>
      </form>
    </div>
  );
};

export default SearchBar;