import Image from 'next/image'

import { QRCode } from 'react-qrcode-logo'
import ResponsiveText from '../../components/responsiveText'
import styles from '../../styles/Slideshow.module.css'

export default function Info({ data, align }) {
  console.log({ data })
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
    size: 250, //The size of the QR Code
    quietZone: 10, //The size of the quiet zone around the QR Code. This will have the same color as QR Code bgColor
    bgColor: "#000000", //Background color
    fgColor: "#ffffff", //Foreground color
    logoImage: data.imageUrl, //The logo image. It can be a url/path or a base64 value
    logoWidth: 180,
    logoHeight: 180,
    logoOpacity: 0.5,
    qrStyle: "squares" //Style of the QR Code modules - dots or squares
  }

  return (
    <div className={[styles.infoContainer]}>
      <div>
        <h3 className={styles.tvnft}>TVNFT</h3>
        <div className={styles.logoContainer}>
          <img height="50px" width="auto" src="/opensea.png" />
          {/* <h2 className={styles.logo}>OpenSea</h2> */}
        </div>
        <h3>{data.collectionName || 'CryptoPunks'}</h3>
        <h1>{data.name || (data.tokenId && `#${data.tokenId}`) || 'CryptoPunk #5217'}</h1>
      </div>
      {/* <p className={styles.priceHeader}>Price/Highest Offer:</p>
      <div className={styles.logoContainer}>
        <img className={styles.currency} height="20px" width="20px" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" />
        <p>2,250</p>
      </div>  */}
      <QRCode value={data.permalink} options={options} />
    </div>
  )
}
