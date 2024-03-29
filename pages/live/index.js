import Head from 'next/head'
import { useEffect, useState } from 'react'
import { readListings, retrieveOpenSea } from '../../api'
import Slideshow from '../../components/slideshow'
import styles from '../../styles/Home.module.css'

export default function Live() {
  const [listings, setListings] = useState([])
  useEffect(() => {
    async function getListings() {
      const response = await readListings()
      // const data = await retrieveOpenSea(response)
      console.log({ response })
      if (response) {
        setListings(response)
      }
    }
    getListings()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>TVNFT / Live</title>
        <meta name="description" content="TVNFT - Showcasing the best upcoming NFT drops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {listings.length > 0 && <Slideshow listings={listings} main />}
      </main>
    </div>
  )
}
