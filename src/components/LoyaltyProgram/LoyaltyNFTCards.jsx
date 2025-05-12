import React, { useRef, useEffect } from 'react';
import styles from './LoyaltyNFTCards.module.scss';

const LoyaltyNFTCards = () => {
  const flexLinesRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    flexLinesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      flexLinesRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className={styles.nftCardsSection}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>NFT Cards</h1>
        <p className={styles.pageDescription}>
          Exclusive digital collectibles that represent your membership status. Each card features premium design and grants special privileges.
        </p>
      </div>

      {/* Alternating Content Section */}
      <section className={styles.alternatingSection}>
        <div className={styles.container}>
          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h2>Premium NFT Loyalty Cards</h2>
                <p>Introducing our exclusive Victor Wang NFT loyalty cards. Each card represents your dedication to premium products and grants you special privileges in our community. Collect them all to showcase your status as a true enthusiast.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/card.png" 
                  alt="GalaxyStar Loyalty Card"
                  className={styles.alternatingImage}
                />
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
              <div className={styles.flexItem}>
                <img 
                  src="/images/card2.png" 
                  alt="Premium Loyalty Card"
                  className={styles.alternatingImage}
                />
              </div>
              <div className={styles.flexItem}>
                <h2>Luxury Collector's Edition</h2>
                <p>Our cards feature sleek, modern designs with sophisticated illuminated elements that stand out in any collection. Each card is meticulously crafted to represent the pinnacle of design excellence and exclusive membership status.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h2>Limited Edition Series</h2>
                <p>Only a limited number of these distinctive cards will ever be produced, making them highly coveted collector's items. Each card is embedded with a unique identifier and features cutting-edge technology for authentication.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/card3.png" 
                  alt="NFT Loyalty Card" 
                  className={styles.alternatingImage}
                />
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[3] = el)}>
              <div className={styles.flexItem}>
                <img 
                  src="/images/card4.png" 
                  alt="Member Benefits" 
                  className={styles.alternatingImage}
                />
              </div>
              <div className={styles.flexItem}>
                <h2>Exclusive Membership Perks</h2>
                <p>Card holders receive VIP treatment with every interaction, including early access to new releases, exclusive events, personal shopping assistance, and priority customer service. Your loyalty card is your key to a world of premium experiences.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[4] = el)}>
              <div className={styles.flexItem}>
                <h2>Distinguished Design</h2>
                <p>Every card showcases a mesmerizing eclipse design that symbolizes our commitment to excellence and innovation. The glowing ring represents the perfect fusion of technology and artistry that defines our brand philosophy.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/cardmain.png" 
                  alt="Loyalty Community" 
                  className={styles.alternatingImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className={styles.callToAction}>
        <h3>Ready to join our premium loyalty program?</h3>
        <p>Sign up today and begin your journey to exclusive membership benefits and collectible cards.</p>
        <button className={styles.ctaButton}>Join Now</button>
      </div>
    </div>
  );
};

export default LoyaltyNFTCards; 