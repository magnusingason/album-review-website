import Navbar from '@components/Navbar'
import { useRouter } from 'next/router'
import styles from '../../styles/index.module.css'
import Head from 'next/head'


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
        data,
      },
    }
  }

function QueryPage({data}) {

    const albums = data.album

    const router = useRouter()
  return (
    <div>
      <Head>
        <title>Query Page</title>
      </Head>

      <Navbar />
      
   <div className={styles.container}>
      {albums.map((item) => (
        <div key={item._id}>
          <a >
          <div className={styles.album_card}>
            <div className={styles.image_block}>
              <h1 className={styles.card_title}>{item.title}</h1>
              <img src={item.picture} className={styles.card_image} />
              <div className={styles.card_flex}>
                <h2 className={styles.card_artists}>{item.Artist}</h2>
                <p className={styles.summary}>{item.summary}</p>
                <div className={styles.button_rating_box}>
                  <div>
                    <p className={styles.card_rating}>{item.rating}</p>
                  </div>
                  <div>
                    <button onClick={() => router.push({
                      pathname: `/${item._id}`,
                      query: { id: item._id }
                      })}>Read Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </a>
        </div>
    ))}
    </div>
    </div>
  )
}


export default QueryPage;