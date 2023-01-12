import Navbar from '@components/Navbar'
import { useRouter } from 'next/router'
import styles from '../styles/review_id.module.css'


export async function getServerSideProps(context) {

    const { id } = context.query;
    
    const res = await fetch(`http://localhost:3000/api/${id}`);
    const data = await res.json();
    return {
      props: {
        data,
      },
    }
  }

function ReviewPage({data}) {

    data = data.album

    return( 
        <div>
            <Navbar />
            <div className={styles.upper_wrapper}>
                <div className={styles.box1}>
                    <a className={styles.title}> {data.title}</a>
                    <a className={styles.artist}>{data.Artist}</a>
                </div>
                <div className={styles.box}>
                    <div className={styles.image}>
                        <img src={data.picture}></img>
                    </div>
                    <div className={styles.rating}>
                        {data.rating}
                    </div>
                </div>

            </div>
            <div>
            <div className={styles.text_above_summary}> Here is what the reviewer had to say about the Album....</div>
            <div className={styles.review}>
                {data.summary}
            </div>
            </div>
        </div>
    )
}

export default ReviewPage;