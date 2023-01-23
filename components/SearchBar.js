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
    if (!query){
      router.push({
        pathname: `/search/${query}`,
        query: { query: '' }
      })
    }else{
    router.push({
      pathname: `/search/${query}`,
      query: { query: query }
    })
  }
  };

  return (
    <div className={styles.search_container}>
      <form onSubmit={handleSubmit} className={styles.search_bar}>
        <input type="text" value={query} placeholder="input search here" onChange={handleChange} className={styles.search_input} />
        <button className={styles.search_button} type="submit"> <img src="https://www.freepnglogos.com/uploads/search-png/search-icon-transparent-images-vector-15.png" alt="me" /></button>
      </form>
    </div>
  );
};

export default SearchBar;