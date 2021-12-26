import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputAdornment from '@mui/material/InputAdornment';

import Box from '@mui/material/Box';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import { setFormData, clearForm } from '../../redux/reducers/promoFormReducer';

import styles from '../../styles/Home.module.css'

import { writeListing } from '../../api'
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
export default function PromoForm() {
  // const [formData, setFormData] = useState({ ...blankForm });
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.promoForm.formData);
  const [imageFiles, setImageFiles] = useState([]);

  const addListing = async () => {
    await writeListing(formData);
    clearForm();
  }

  const onImage = (files) => {
    setImageFiles(files);
    console.log(files[0]);
    updateForm({ ...formData, image: URL.createObjectURL(files[0]) });
  }

  const updateForm = (newForm) => {
    dispatch(setFormData(newForm));
  }
  
  return (
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
          onChange={({ target: { value }}) => updateForm({ ...formData, pieceType: value })}
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
        onChange={({ target: { value } }) => updateForm({ ...formData, name: value})}
        required
        label={`Name of the ${formData.pieceType === 'collection' ? 'collection' : 'piece'}`}
        fullWidth
      /> 

      <TextField
        className={styles.formItem}
        value={formData.description}
        onChange={({ target: { value } }) => updateForm({ ...formData, description: value})}
        required
        label="Description"
        multiline
        fullWidth
      />

      {formData.image && <img src={formData.image} height={300} />}

      <div className={styles.formItem}>
        <FileInput
          onChange={(files) => onImage(files)}
          value={imageFiles}
        />
      </div>

      <TextField
        className={styles.formItem}
        value={formData.price}
        onChange={({ target: { value } }) => updateForm({ ...formData, price: value})}
        required
        type="number"
        label={`Price${formData.pieceType === 'collection' ? ' per mint' : ''}`}
        fullWidth
      />

      <TextField
        className={styles.formItem}
        value={formData.supply}
        onChange={({ target: { value } }) => updateForm({ ...formData, supply: value})}
        required
        type="number"
        label={formData.pieceType === 'collection' ? 'Supply' : 'Editions'}
        fullWidth
      />

      <TextField
        className={styles.formItem}
        value={formData.blockchain}
        onChange={({ target: { value } }) => updateForm({ ...formData, blockchain: value})}
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
          onChange={({ target: { value } }) => updateForm({ ...formData, marketplace: value})}
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
        placeholder='This will be the QR code URL'
        fullWidth
      />

      <DatePicker
        label="NFT Launch date"
        // inputFormat="DD/MM/yyyy"
        // shouldDisableDate="is"
        value={formData.dateAvailable}
        onChange={(e) => {
          console.log(e._d);
          updateForm({ ...formData, dateAvailable: new Date(e._d) });
        }}
        renderInput={(params) => <TextField required className={styles.formItem} fullWidth {...params} />}
      />

      <TextField
        className={styles.formItem}
        value={formData.twitterHandle}
        onChange={({ target: { value } }) => updateForm({ ...formData, twitterHandle: value})}
        required
        label="Twitter handle"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />

      <DatePicker
        label="TVNFT Display Date"
        // inputFormat="DD/MM/yyyy"
        // shouldDisableDate="is"
        value={formData.date}
        onChange={(e) => {
          updateForm({ ...formData, displayDate: new Date(e._d) });
        }}
        renderInput={(params) => <TextField required className={styles.formItem} fullWidth {...params} />}
      />
      <Button onClick={addListing}>Submit Listing</Button>
    </Box>
  )
};
