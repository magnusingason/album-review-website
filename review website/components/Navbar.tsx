import React from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import styles from '../styles/navbar.module.css'

type Props = {
}

const Navbar: React.FC<Props> = ({}) => {


  return (
    <div className={styles.NavBar}>
      <Link legacyBehavior href="/">
      <a className={styles.name}>Album Review Website</a>
      </Link>
      <SearchBar />
      <Link legacyBehavior href="/createreview">
        <a className={styles.createlink}>Click to create review </a>
      </Link>
    </div>
  )
}

export default Navbar
