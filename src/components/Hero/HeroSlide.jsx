import styles from './Hero.module.scss';
import Link from 'next/link';

const HeroSlide = ({ 
  slide, 
  index, 
  videoRefs, 
  imagesLoaded, 
  handleVideoLoad, 
  handleExplore 
}) => {
  const renderBackground = (slide, index) => {
    if (slide.type === 'video') {
      return (
        <video
          ref={el => videoRefs.current[index] = el}
          className={styles.videoBackground}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => handleVideoLoad(index)}
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

  const renderFeatureCard = (slide) => (
    <Link 
      href={slide.link} 
      className={`${styles.featureCard} ${slide.theme === 'light' ? styles.light : ''} ${!imagesLoaded ? styles.loading : ''}`}
    >
      <div className={styles.imageWrapper}>
        <img 
          src={slide.productImage} 
          alt={slide.title}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className={styles.title}>{slide.title}</div>
      <div className={styles.description}>{slide.description}</div>
    </Link>
  );

  return (
    <section className={styles.hero}>
      {renderBackground(slide, index)}
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
      {renderFeatureCard(slide)}
    </section>
  );
};

export default HeroSlide; 