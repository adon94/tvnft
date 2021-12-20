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
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import styles from '../../styles/Home.module.css'

import { writeListing, readListings } from '../../api'
import Slideshow from '../../components/slideshow';
import FileInput from '../../components/inputs/FileInput';

const COLLECTION = 'COLLECTION';
const SINGLE = 'SINGLE';

const blankForm = {
  pieceType: SINGLE,
  name: 'Test Name',
  description: 'Test description bla bla bla. This is a sentence.',
  image: null,
  marketplace: 'OpenSea',
  url: 'opensea.io', // landing page or marketplace url
  twitterHandle: 'mirros_nft',
  displayDate: new Date('Tue Dec 14 2021 15:18:59 GMT+0000 (Western European Standard Time)'),
  media: null,
  blockchain: 'Ethereum',
  price: '15',
  dateAvailable: new Date('Fri Dec 24 2021 15:18:59 GMT+0000 (Western European Standard Time)'),
  supply: 1,
};
// const blankForm = {
//   pieceType: 'collection',
//   marketplace: '',
//   name: '',
//   description: '',
//   url: '', // landing page or marketplace url
//   displayDate: [],
//   twitterHandle: '',
//   media: [],
//   blockchain: '',
//   price: '',
//   dateAvailable: '',
//   // collection
//   quantity: '',
//   // single piece
//   editions: '',
// };

const marketplaces = ['OpenSea', 'Foundation', 'SuperRare', 'Hic et Nunc', 'KnownOrigin', 'Solanart']
const blockchains = ['Ethereum', 'Polygon', 'Tezos', 'Solana', 'Binance', 'Cardano', 'Wax']
export default function About() {
  const [formData, setFormData] = useState({ ...blankForm });
  const [imageFiles, setImageFiles] = useState([]);


  const [data, setData] = useState({})

  const onUrlInput = (urlValue) => {
    // eg, https://opensea.io/assets/0x60e4d786628fea6478f785a6d7e704777c86a7c6/5422
    setFormData({ ...formData, url: urlValue });

    if (urlValue.includes('opensea.io')) {
      const tokenInfos = urlValue.split('assets/')[1];
      const options = { method: 'GET' };
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
  }

  const addListing = async () => {
    // await writeListing(formData.url, formData.displayDate);
    await writeListing(formData);
    setFormData({ ...blankForm });
  }

  const onImage = (files) => {
    setImageFiles(files)
    setFormData({ ...formData, image: URL.createObjectURL(files[0]) })
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
            <FormLabel component="legend">Collection or Single Piece?</FormLabel>
            <RadioGroup
              value={formData.pieceType}
              onChange={({ target: { value }}) => setFormData({ ...formData, pieceType: value})}
              row aria-label="promotionType"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value={COLLECTION} control={<Radio />} label="Whole Collection" />
              <FormControlLabel value={SINGLE} control={<Radio />} label="Single Piece" />
            </RadioGroup>
          </FormControl>

          <TextField
            className={styles.formItem}
            value={formData.name}
            onChange={({ target: { value } }) => setFormData({ ...formData, name: value})}
            required
            label={`Name of the ${formData.pieceType === 'collection' ? 'collection' : 'piece'}`}
            fullWidth
          /> 

          <TextField
            className={styles.formItem}
            value={formData.description}
            onChange={({ target: { value } }) => setFormData({ ...formData, description: value})}
            required
            label="Description"
            multiline
            fullWidth
          />

          {formData.image && <img src={formData.image} height={500} />}

          <div className={styles.formItem}>
            <FileInput
              onChange={(files) => onImage(files)}
              value={imageFiles}
            />
          </div>

          <TextField
            className={styles.formItem}
            value={formData.price}
            onChange={({ target: { value } }) => setFormData({ ...formData, price: value})}
            required
            type="number"
            label={`Price${formData.pieceType === 'collection' ? ' per mint' : ''}`}
            fullWidth
          />

          <TextField
            className={styles.formItem}
            value={formData.supply}
            onChange={({ target: { value } }) => setFormData({ ...formData, supply: value})}
            required
            type="number"
            label={formData.pieceType === 'collection' ? 'Supply' : 'Editions'}
            fullWidth
          />

          <TextField
            className={styles.formItem}
            value={formData.blockchain}
            onChange={({ target: { value } }) => setFormData({ ...formData, blockchain: value})}
            required
            label="Blockchain"
            placeholder="Ethereum, Polygon, Tezos, Solana..."
            fullWidth
          />

          <FormControl className={styles.formItem} fullWidth>
            <InputLabel id="marketplace-select-label">Marketplace</InputLabel>
            <Select
              labelId="marketplace-select-label"
              id="marketplace-select"
              label="Marketplace"
              value={formData.marketplace}
              onChange={({ target: { value } }) => setFormData({ ...formData, marketplace: value})}
            >
              {marketplaces.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField
            className={styles.formItem}
            value={formData.url}
            onChange={({ target: { value } }) => onUrlInput(value)}
            required
            label="Landing page or marketplace url"
            fullWidth
          />

          <DatePicker
            label="NFT Launch date"
            // inputFormat="DD/MM/yyyy"
            // shouldDisableDate="is"
            value={formData.dateAvailable}
            onChange={(e) => {
              console.log(e._d);
              setFormData({ ...formData, dateAvailable: new Date(e._d) });
            }}
            renderInput={(params) => <TextField required className={styles.formItem} fullWidth {...params} />}
          />

          <TextField
            className={styles.formItem}
            value={formData.twitterHandle}
            onChange={({ target: { value } }) => setFormData({ ...formData, twitterHandle: value})}
            required
            label="Twitter handle"
            fullWidth
          />

          <DatePicker
            label="TVNFT Display Date"
            // inputFormat="DD/MM/yyyy"
            // shouldDisableDate="is"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, displayDate: new Date(e._d) });
            }}
            renderInput={(params) => <TextField required className={styles.formItem} fullWidth {...params} />}
          />
        </Box>

        <Button onClick={addListing}>Add Listing</Button>
      </main>
      <Slideshow data={formData} />
    </div>
  )
}
