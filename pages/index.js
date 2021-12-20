import Head from 'next/head'
import Image from 'next/image'

import PromoForm from '../components/promoForm'
import Slideshow from '../components/slideshow'
import styles from '../styles/Home.module.css'
import { Button } from '@material-ui/core'

export default function Home() {
  // const [listings, setListings] = useState()
  // useEffect(() => {
  //   async function getListings() {
  //     const response = await readListings()
  //     const data = await retrieveOpenSea(response)
  //     console.log({ data })
  //     setListings(data)
  //   }
  //   getListings()
  // }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>TVNFT / Promote</title>
        <meta name="description" content="Promote your NFTs with TvNFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <Button
          variant="contained"
          component="label"
          onClick={() => checkEth()}
        >
          Check MetaMask
        </Button> */}
        <h1 className={styles.title}>
          Promote your NFTs with <a href="/">TVNFT</a>
        </h1>
        <PromoForm />
        <Slideshow preview />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
