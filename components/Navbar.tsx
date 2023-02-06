import React from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import styles from '../styles/navbar.module.css'
import {useUser} from '@auth0/nextjs-auth0/client'



type Props = {
}


const Navbar: React.FC<Props> = ({}) => {
  const {user, error, isLoading} = useUser()


  return (
    <div className={styles.NavBar}>
      <Link legacyBehavior href="/">
      <a className={styles.name}>Album Review Website</a>
      </Link>
      <SearchBar />
      <Link legacyBehavior href="/createreview">
        <a className={styles.createlink}>Click to create review </a>
      </Link>
      {user ? <Link legacyBehavior href="/api/auth/logout">
          <a className={styles.createlink}>Log out</a>
      </Link>: <Link legacyBehavior href="/api/auth/login">
          <a className={styles.createlink}>Log in</a>
      </Link>}
    </div>
  )
}

export default Navbar
