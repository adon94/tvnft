// import { Fade } from 'react-slideshow-image'
// import 'react-slideshow-image/dist/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index';
import Image from 'next/image'
import Info from './Info';
import styles from '../../styles/Slideshow.module.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Preview = ({ landing, data, main }) => {
  const { image, imageUrl } = data;
  let imageLink = main ? `gs://tvnft-b2eb6.appspot.com/${imageUrl}` : image
  console.log({ imageLink });
  const [imageL, setImageL] = useState('');

  if (main) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      console.log({ event });
      const blob = xhr.response;
      setImageL(blob);
    };
    xhr.open('GET', imageLink);
    xhr.send();
  }

  return (
    <div className={`${styles.container} ${landing && styles.landing}`}>
      <Info data={data} />
      <div className={styles.imageContainer}>
        {/* <img
          src={image || "https://lh3.googleusercontent.com/x-8cxWfSABaoHdqyUvosBDeLr4c_6GO4YU17eHAKcF9-SwOj3FEMqQA_7mOwtg9glv7e6P8WnZuDR2_bPTiUvrai=s0"}
          height="100%"
        /> */}
        <Image
          src={imageLink || "https://lh3.googleusercontent.com/x-8cxWfSABaoHdqyUvosBDeLr4c_6GO4YU17eHAKcF9-SwOj3FEMqQA_7mOwtg9glv7e6P8WnZuDR2_bPTiUvrai=s0"}
          alt="NFT"
          objectFit="contain"
          layout='fill'
          priority
        />
        {/* <Image layout="fill" objectFit="contain" objectPosition="left top" height={size.height || 1} width={size.height || 1} loader={myLoader} src="punk" alt="punk"/> */}
      </div>
      <Info data={data} right />
    </div>
  )
}

export default function Slideshow({ listings, preview, landing, main }) {
  const formData = useSelector((state) => state.promoForm.formData);
  if (preview) {
    return <Preview landing={landing} data={formData} />
  }
  if (listings) {
    let mouseTimer = null, cursorVisible = true;

    function disappearCursor() {
        mouseTimer = null;
        document.body.style.cursor = "none";
        cursorVisible = false;
    }

    document.onmousemove = function() {
        if (mouseTimer) {
            window.clearTimeout(mouseTimer);
        }
        if (!cursorVisible) {
            document.body.style.cursor = "default";
            cursorVisible = true;
        }
        mouseTimer = window.setTimeout(disappearCursor, 5000);
    };

    const options = {
      showArrows: false,
      showStatus: false,
      showIndicators: false,
      infiniteLoop: true,
      showThumbs: false,
      autoPlay: true,
      stopOnHover: false,
      swipeable: false,
      animationHandler: "fade",
      transitionTime: 2000,
      interval: 30000,
    }

    return (
      // <Fade easing="ease" arrows={false} duration={10000} transitionDuration={2000} autoplay>
      <Carousel animationHandler="fade" {...options}>
        {listings.map(l => <Preview key={l.imageUrl} data={l} landing={landing} main={main} />)}
      </Carousel>
      // </Fade>
    )
  }
  return <h1>loading...</h1>
}
