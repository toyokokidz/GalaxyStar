import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import styles from './Hero.module.scss';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const slides = [
    {
      bg: '/videos/anime8.mp4',
      type: 'video',
      productImage: '/images/anime-mousepad.jpg',
      title: 'Samurai Series Pad',
      description: 'Traditional Japanese art meets modern gaming performance',
      link: '/products/samurai-pad',
      theme: 'dark-theme',
      sliderTitle: 'Precision & Style',
      sliderDescription: 'Where Gaming Excellence Meets Artistic Expression'
    },
    {
      bg: '/videos/anime5.mp4',
      type: 'video',
      productImage: '/images/anime-mousepad.jpg',
      title: 'Neo Tokyo Collection',
      description: 'Cyberpunk-inspired mousepad with LED edge lighting',
      link: '/products/neo-tokyo',
      theme: 'blue-theme',
      sliderTitle: 'Future Forward',
      sliderDescription: 'Experience Tomorrows Gaming Technology Today'
    },
    {
      bg: '/images/anime2.jpg',
      type: 'image',
      productImage: '/images/anime-mousepad.jpg',
      title: 'Sakura Edition Gaming Pad',
      description: 'Exclusive design with cherry blossom theme',
      link: '/products/sakura-pad',
      theme: 'green-theme',
      sliderTitle: 'Natural Beauty',
      sliderDescription: 'Harmony of Nature and Gaming Performance'
    },
    {
      bg: '/videos/anime10.mp4',
      type: 'video',
      productImage: '/images/anime-mousepad.jpg',
      title: 'Limited Edition Anime Mousepad XL',
      description: 'Premium gaming surface with unique anime artwork',
      link: '/products/anime-mousepad',
      theme: 'light',
      sliderTitle: 'Elite Gaming Gear',
      sliderDescription: 'Designed for Champions, Made for Legends'
    },
  ];

  const handleExplore = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderBackground = (slide) => {
    if (slide.type === 'video') {
      return (
        <video
          className={styles.videoBackground}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          loading="lazy"
        >
          <source 
            src={slide.bg} 
            type="video/mp4"
            media="all and (min-width: 768px)"
          />
        </video>
      );
    }
    return <div className={styles.imageBackground} style={{ backgroundImage: `url(${slide.bg})` }} />;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const optimizedSlides = slides.map(slide => ({
    ...slide,
    bg: isMobile && slide.type === 'video' ? slide.bg.replace('/videos/', '/images/').replace('.mp4', '.jpg') : slide.bg,
    type: isMobile && slide.type === 'video' ? 'image' : slide.type
  }));

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
        }}
        loop={true}
        className={styles.heroSwiper}
      >
        {optimizedSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className={styles.hero}>
              {renderBackground(slide)}
              <div className={styles.content}>
                <p className={styles.tagline}>
                  {slide.sliderDescription}
                </p>
                <h1 className={styles.title}>
                  {slide.sliderTitle}
                </h1>
                <button onClick={handleExplore} className={styles.exploreButton}>
                  Explore
                </button>
              </div>

              <Link 
                href={slide.link} 
                className={`${styles.featureCard} ${slide.theme === 'light' ? styles.light : ''}`}
              >
                <div className={styles.imageWrapper}>
                  <img src={slide.productImage} alt={slide.title} />
                </div>
                <div className={styles.title}>{slide.title}</div>
                <div className={styles.description}>{slide.description}</div>
              </Link>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.featureCardsContainer}>
        {optimizedSlides.map((slide, index) => (
          <Link href={slide.link} className={`${styles.featureCard} ${slide.theme === 'light' ? styles.light : ''}`} key={index}>
            <div className={styles.imageWrapper}>
              <img src={slide.productImage} alt={slide.title} />
            </div>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;