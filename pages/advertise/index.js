import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import Box from '@mui/material/Box';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';

import styles from '../../styles/Home.module.css'

import { writeListing, readListings } from '../../api'
import Slideshow from '../../components/slideshow';

const marketplaces = ['OpenSea', 'Foundation', 'SuperRare', 'Hic et Nunc', 'KnownOrigin', 'Solanart']
const blockchains = ['Ethereum', 'Polygon', 'Tezos', 'Solana', 'Binance', 'Cardano', 'Wax']
export default function About() {
  const [data, setData] = useState({})
  const [promotionType, setPromotionType] = useState('singlePiece')
  const [marketplace, setMarketplace] = useState('')
  const [url, setUrl] = useState('')
  const [date, setDate] = useState(new Date());
  const [artist, setArtist] = useState('')
  const [seller, setSeller] = useState('')
  const [piece, setPiece] = useState('')
  const [description, setDescription] = useState('')
  const [projectStatus, setProjectStatus] = useState('')
  const [numberOfItems, setNumberOfItems] = useState('')
  const [blockchain, setBlockchain] = useState('Ethereum')
  const [price, setPrice] = useState('')
  const [email, setEmail] = useState('')
  const [twitter, setTwitter] = useState('')
  const [discord, setDiscord] = useState('')
  const [website, setWebsite] = useState('')
  const [saleStart, setSaleStart] = useState('')
  const [saleEnd, setSaleEnd] = useState('')
  const [reveal, setReveal] = useState('')
  const media = 'video or image file' // max 4 images or 1 video
  const [daysLive, setDaysLive] = []

  const onUrlInput = (urlValue) => {
    // eg, https://opensea.io/assets/0x60e4d786628fea6478f785a6d7e704777c86a7c6/5422
    const options = { method: 'GET' }
    const tokenInfos = urlValue.split('assets/')[1]
    setUrl(urlValue)

    fetch(`https://api.opensea.io/api/v1/asset/${tokenInfos}/`, options)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        const {
          name,
          token_id: tokenId,
          image_original_url: imageUrl,
          collection: { name: collectionName },
          // owner: { user: { username: owner }}
        } = response
        console.log(imageUrl)
        setData({ name, imageUrl, collectionName, tokenId })
      })
      .catch(err => console.error(err));
  }

  const addListing = async () => {
    await writeListing(url, date)
    setUrl('')
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Advertise</title>
        <meta name="description" content="Advertise with TvNFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Promote your NFTs with <a href="/">TVNFT</a>
        </h1>

        {/* <form className={styles.formContainer} noValidate autoComplete="off"> */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.formContainer}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Promotion type</FormLabel>
            <RadioGroup
              value={promotionType}
              onChange={({ target: { value }}) => setPromotionType(value)}
              row aria-label="promotionType"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="singlePiece" control={<Radio />} label="Single Piece" />
              <FormControlLabel value="collection" control={<Radio />} label="Collection" />
            </RadioGroup>
          </FormControl>

          <FormControl className={styles.formItem} fullWidth>
            <InputLabel id="marketplace-select-label">Host Marketplace</InputLabel>
            <Select
              labelId="marketplace-select-label"
              id="marketplace-select"
              value={marketplace}
              onChange={({ target: { value } }) => setMarketplace(value)}
            >
              {marketplaces.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField
            className={styles.formItem}
            value={url}
            onChange={({ target: { value } }) => onUrlInput(value)}
            required
            label="OpenSea Url"
            fullWidth
          />
          <DesktopDatePicker
            label="Promotion Date"
            inputFormat="DD/MM/yyyy"
            // shouldDisableDate="is"
            value={date}
            onChange={({ target: { value } }) => setDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <TextField
            className={styles.formItem}
            value={artist}
            onChange={({ target: { value }}) => setArtist(value)}
            required
            label="Artist/Studio name"
            fullWidth
          />
          <TextField
            className={styles.formItem}
            value={piece}
            onChange={({ target: { value }}) => setPiece(value)}
            required
            label="Piece name/Collection name"
            fullWidth
          />
          <FormControl className={styles.formItem} fullWidth>
            <InputLabel id="blockchain-select-label">Blockchain</InputLabel>
            <Select
              labelId="blockchain-select-label"
              id="blockchain-select"
              required
              value={blockchain}
              onChange={({ target: { value }}) => setBlockchain(value)}
            >
              {blockchains.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            className={styles.formItem}
            required id="filled-basic" 
            label="Price"
            fullWidth
            value={price}
            onChange={({ target: { value }}) => setPrice(value)}
          />
          <TextField
            className={styles.formItem}
            required
            id="outlined-basic"
            label="Listing URL / Find out more at..."
            fullWidth
            value={blockchain}
            onChange={({ target: { value }}) => setBlockchain(value)}
          /> */}
        </Box>

        <Button onClick={addListing}>Add Listing</Button>
      </main>
      <Slideshow data={data} />
      {/* <footer className={styles.footer}>
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
      </footer> */}
    </div>
  )
}
