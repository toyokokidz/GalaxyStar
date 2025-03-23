import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './Hero.module.scss';
import { useRef, useEffect, useState } from 'react';
import HeroSlide from './HeroSlide';
import { slides } from './heroData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const handleExplore = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const videoRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const optimizedSlides = slides.map(slide => ({
    ...slide,
    bg: isMobile && slide.type === 'video' ? slide.bg.replace('/videos/', '/images/').replace('.mp4', '.jpg') : slide.bg,
    type: isMobile && slide.type === 'video' ? 'image' : slide.type
  }));

  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = slides.map(slide => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = slide.productImage;
          img.onload = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    };

    preloadImages();
  }, []);

  const handleVideoLoad = (index) => {
    if (index === 0) {
      setImagesLoaded(true);
    }
  };

  return (
    <div className={styles.heroWrapper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ 
          clickable: true,
          renderBullet: function (index, className) {
            return `
              <span class="${className} ${styles.customBullet}">
                <span class="${styles.progressBar}"></span>
              </span>
            `;
          }
        }}
        autoplay={{ 
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        speed={1000}
        loop={true}
        className={styles.heroSwiper}
        preloadImages={true}
        watchSlidesProgress={true}
        slidesPerView={1}
      >
        {optimizedSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroSlide
              slide={slide}
              index={index}
              videoRefs={videoRefs}
              imagesLoaded={imagesLoaded}
              handleVideoLoad={handleVideoLoad}
              handleExplore={handleExplore}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;