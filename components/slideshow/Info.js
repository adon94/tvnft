import Image from 'next/image'

import { QRCode } from 'react-qrcode-logo'
import Typography from '@mui/material/Typography';
import moment from 'moment';

import styles from '../../styles/Slideshow.module.css'

export default function Info({ data, right }) {
  // const { inputRef } = useQRCode<HTMLCanvasElement>({
  //   text: 'https://github.com/bunlong/next-qrcode',
  //   options: {
  //     level: 'M',
  //     margin: 7,
  //     scale: 1,
  //     width: 200,
  //     color: {
  //       dark: '#010599FF',
  //       light: '#FFBF60FF',
  //     },
  //   },
  // });

  // console.log({ inputRef })
  const options = {
    ecLevel: 'M', //The error correction level of the QR Code
    enableCORS: false, //Enable crossorigin attribute
    size: 150, //The size of the QR Code
    quietZone: 0, //The size of the quiet zone around the QR Code. This will have the same color as QR Code bgColor
    bgColor: "black", //Background color
    fgColor: "white", //Foreground color
    qrStyle: "squares" //Style of the QR Code modules - dots or squares
  }

  return (
    <div className={[styles.infoContainer]}>
      <div>
        <div className={`${styles.infoGutter} ${right ? styles.infoRight : styles.infoLeft}`}>
          {/* <h3 className={styles.tvnft}>TVNFT</h3> */}
          <Typography className={styles.tvnft} variant="subtitle2" gutterBottom>TV/NFT</Typography>
          {/* <div className={styles.logoContainer}>
            <img height="50px" width="auto" src="/opensea.png" />
          </div> */}
          <Typography variant="h4">&apos;{data.name || (data.tokenId && `#${data.tokenId}`) || 'CryptoPunk #5217'}&apos;</Typography>
          {/* <Typography variant="body">{data.description}</Typography> */}
        </div>
        {/* <p className={styles.priceHeader}>Price/Highest Offer:</p>
        <div className={styles.logoContainer}>
          <img className={styles.currency} height="20px" width="20px" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" />
          <p>2,250</p>
        </div>  */}
        <div className={`${styles.infoGutter} ${right ? styles.infoRight : styles.infoLeft}`}>
          <Typography variant="subtitle2">Created by</Typography>
          <Typography variant="h5">{'@' + data.twitterHandle || 'CryptoPunks'}</Typography>
        </div>
        <div className={`${styles.infoGutter} ${right ? styles.infoRight : styles.infoLeft}`}>
          <Typography variant="subtitle2">{data.pieceType === 'COLLECTION' ? 'Supply' : 'Editions'}</Typography>
          <Typography variant="h5">{data.supply}</Typography>
        </div>
        <div className={`${styles.infoGutter} ${right ? styles.infoRight : styles.infoLeft}`}>
          <Typography variant="subtitle2">Price</Typography>
          <Typography variant="h5">{data.price} $ETH</Typography>
        </div>
        <div className={`${styles.infoGutter} ${right ? styles.infoRight : styles.infoLeft}`}>
          <Typography variant="subtitle2">Available</Typography>
          <Typography variant="h5">{moment(data.dateAvailable).format('MMM Do YYYY')}</Typography>
        </div>
      </div>
      <div className={right ? styles.infoRight : styles.infoLeft}>
        <QRCode value={data.permalink} {...options} />
      </div>
    </div>
  )
}
