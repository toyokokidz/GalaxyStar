import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoyaltyTiers.module.scss';

const tiers = [
  {
    name: 'Stardust',
    points: '0-1000',
    color: '#6C7A89',
    benefits: [
      'Free standard shipping on orders over $50',
      '1% cashback rewards on purchases',
      'Birthday gift',
      'Newsletter with exclusive content'
    ],
    icon: '✦'
  },
  {
    name: 'Nebula',
    points: '1000-5000',
    color: '#3498DB',
    benefits: [
      'Free standard shipping on all orders',
      '3% cashback rewards on purchases',
      'Early access to sales (24 hours)',
      'Exclusive seasonal gifts',
      'Member-only discounts'
    ],
    icon: '✧'
  },
  {
    name: 'Supernova',
    points: '5000+',
    color: '#9B59B6',
    benefits: [
      'Free express shipping on all orders',
      '5% cashback rewards on purchases',
      'Early access to new products (48 hours)',
      'Priority customer service',
      'Free returns',
      'Exclusive limited edition products',
      'Annual anniversary gift'
    ],
    icon: '★'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const tierVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const LoyaltyTiers = () => {
  return (
    <div className={styles.tiersSection}>
      <h2 className={styles.sectionTitle}>Membership Tiers</h2>
      <p className={styles.sectionDescription}>
        Our loyalty program features three tiers with increasing benefits. 
        Advance through the tiers by earning points with every purchase!
      </p>
      
      <motion.div 
        className={styles.tiersContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tiers.map((tier, index) => (
          <motion.div 
            key={tier.name}
            className={styles.tierCard}
            style={{ 
              '--tier-color': tier.color,
              '--tier-index': index
            }}
            variants={tierVariants}
          >
            <div className={styles.tierIcon}>{tier.icon}</div>
            <h3 className={styles.tierName}>{tier.name}</h3>
            <div className={styles.tierPoints}>{tier.points} Points</div>
            
            <ul className={styles.benefitsList}>
              {tier.benefits.map((benefit, i) => (
                <li key={i} className={styles.benefitItem}>{benefit}</li>
              ))}
            </ul>
            
            {index < tiers.length - 1 && (
              <div className={styles.nextTier}>
                <span>{tiers[index + 1].points.split('-')[0]} points to next tier</span>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${(index + 1) * 33}%` }}></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      
      <div className={styles.pointsInfo}>
        <h3>How to Earn Points</h3>
        <div className={styles.pointsGrid}>
          <div className={styles.pointItem}>
            <span className={styles.pointValue}>1 Point</span>
            <span className={styles.pointDesc}>per $1 spent</span>
          </div>
          <div className={styles.pointItem}>
            <span className={styles.pointValue}>500 Points</span>
            <span className={styles.pointDesc}>for writing a review</span>
          </div>
          <div className={styles.pointItem}>
            <span className={styles.pointValue}>250 Points</span>
            <span className={styles.pointDesc}>for referring a friend</span>
          </div>
          <div className={styles.pointItem}>
            <span className={styles.pointValue}>100 Points</span>
            <span className={styles.pointDesc}>for social media shares</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyTiers; 