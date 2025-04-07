import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DiscoverSection.module.scss';
import splitStyles from './SplitSection.module.scss';
import HandCrafted from '../HandCrafted/HandCrafted';

const CONTENT = [
  {
    id: 1,
    number: "01",
    title: "Beyond Perfection",
    text: "In a world of mass production, GalaxyStar stands out. Our hand-painted process celebrates the imperfections that make each product unique.",
    image: "/images/mechanical-keyboard-yellow.jpg"
  },
  {
    id: 2,
    number: "02",
    title: "A Canvas of Innovation",
    text: "At GalaxyStar, our products are more than just gadgets; they're canvases for artists. Each piece is hand-painted by skilled craftsmen.",
    image: "/images/Alpha65.png"
  },
  {
    id: 3,
    number: "03",
    title: "Revealing the Artist's Strokes",
    text: "When you hold a GalaxyStar product, you're holding art. Our craftsmen meticulously paint each surface, ensuring no two products are the same.",
    image: "/images/Mars.png"
  },
  {
    id: 4,
    number: "04",
    title: "A Symphony of Colors",
    text: "Handcrafting allows us to blend vibrant colors seamlessly, creating a visual feast that complements the advanced technology within.",
    image: "/images/galaxy-mouse-gunmetal.jpg"
  },
  {
    id: 5,
    number: "05",
    title: "Connecting with Art",
    text: "Integrating GalaxyStar into your life means connecting with art. The tactile experience of our hand-painted products deepens your connection.",
    image: "/images/galaxy-mouse-yellow.jpg"
  }
];

const SplitSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isLocked = useRef(false);
  const touchStartY = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = (e) => {
      if (!isLocked.current || isAnimating.current) return;
      
      const direction = e.type === 'wheel' ? Math.sign(e.deltaY) : 
                      Math.sign(touchStartY.current - e.touches[0].clientY);
      
      const newIndex = activeIndex + direction;
      if (newIndex < 0 || newIndex >= CONTENT.length) {
        isLocked.current = false;
        document.body.style.overflow = '';
        return;
      }

      isAnimating.current = true;
      setActiveIndex(newIndex);

      setTimeout(() => {
        isAnimating.current = false;
      }, 800);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isLocked.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          document.body.style.overflow = 'hidden';
          window.addEventListener('wheel', handleScroll, { passive: false });
          window.addEventListener('touchstart', handleTouchStart, { passive: false });
          window.addEventListener('touchmove', handleScroll, { passive: false });
        } else {
          document.body.style.overflow = '';
          window.removeEventListener('wheel', handleScroll);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleScroll);
        }
      },
      { threshold: 0.7 }
    );

    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleScroll);
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef} 
      className={splitStyles.splitSection}
      style={{ 
        marginTop: '20vh',
        scrollSnapAlign: 'start',
        touchAction: 'none'
      }}
    >
      <div className={splitStyles.textColumn}>
        <AnimatePresence mode="wait">
          <motion.div
            key={CONTENT[activeIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className={splitStyles.blockNumber}>{CONTENT[activeIndex].number}</span>
            <h2 className={splitStyles.blockTitle}>{CONTENT[activeIndex].title}</h2>
            <p className={splitStyles.blockText}>{CONTENT[activeIndex].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={splitStyles.imageColumn}>
        <AnimatePresence mode="wait">
          <motion.img
            key={CONTENT[activeIndex].id}
            src={CONTENT[activeIndex].image}
            alt={CONTENT[activeIndex].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={splitStyles.fixedImage}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

const DiscoverSection = () => {
  return (
    <>
      <section className={styles.discoverSection} style={{ height: '400px' }}>
        <div className={styles.container}>
          <div className={styles.headBlock}>
            <img 
              src="/images/galaxy-keyboard-pro.webp" 
              alt="GalaxyStar Keyboard"
              className={styles.image}
              style={{ height: '400px' }}
            />
            <span className={styles.sectionTitle}>Handcrafted Art</span>
          </div>
        </div>
      </section>
      
      <SplitSection />
      <HandCrafted />
    </>
  );
};

export default DiscoverSection;