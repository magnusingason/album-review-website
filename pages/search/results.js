import Navbar from '@components/Navbar'
import { useRouter } from 'next/router'
import styles from '../../styles/index.module.css'
import Head from 'next/head'
import SongQuery from '../../components/SongQuery';


export async function getServerSideProps(context) {

    const { query } = context.query;
    

    let res
    if(process.env.NODE_ENV == 'development'){
    res = await fetch(`http://localhost:3000/api/search/${query}`);
    }
    if(process.env.NODE_ENV == 'production'){
    res = await fetch(`https://album-review-website.herokuapp.com/api/search/${query}`);
    }
    const data = await res.json();
    return {
      props: {
        data,query
      },
    }
  }

function QueryPage({data,query}) {

    const albums = data.album

    const router = useRouter()
  return (
    <div>
      <Head>
        <title>Query Page</title>
      </Head>

      <Navbar />
    <SongQuery query={query} />
    </div>
  )
}


export default QueryPage;