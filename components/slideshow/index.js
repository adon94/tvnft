// import { Fade } from 'react-slideshow-image'
// import 'react-slideshow-image/dist/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index";
import Info from './Info';
import styles from '../../styles/Slideshow.module.css'

const Preview = ({ data }) => {
  const { imageUrl } = data
  return (
    <div className={styles.container}>
      <Info data={data} align="left" />
      <div className={styles.imageContainer}>
        <img
          src={imageUrl || "https://lh3.googleusercontent.com/x-8cxWfSABaoHdqyUvosBDeLr4c_6GO4YU17eHAKcF9-SwOj3FEMqQA_7mOwtg9glv7e6P8WnZuDR2_bPTiUvrai=s0"}
          height="100%"
        />
        {/* <Image layout="fill" objectFit="contain" objectPosition="left top" height={size.height || 1} width={size.height || 1} loader={myLoader} src="punk" alt="punk"/> */}
      </div>
      <Info data={data} />
    </div>
  )
}

export default function Slideshow({ data, listings }) {
  if (data) {
    return <Preview data={data} />
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
        {listings.map(l => <Preview key={l.imageUrl} data={l} />)}
      </Carousel>
      // </Fade>
    )
  }
  return <h1>loading...</h1>
}
