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
export default function About({
  url,
  onUrlInput,

}) {
  
  return (
    <>
      <TextField
        className={styles.formItem}
        value={url}
        onChange={({ target: { value } }) => onUrlInput(value)}
        required
        label="OpenSea Url"
        fullWidth
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
    </>
  )
}
