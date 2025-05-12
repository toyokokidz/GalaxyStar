import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoyaltyBenefits.module.scss';

const benefits = [
  {
    id: 1,
    title: 'Cashback Rewards',
    description: 'Earn up to 5% back on every purchase as loyalty points that can be redeemed for future orders.',
    icon: '💰'
  },
  {
    id: 2,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all orders, with express options available for higher tier members.',
    icon: '🚚'
  },
  {
    id: 3,
    title: 'Early Access',
    description: 'Be the first to shop new products and collections before they are available to the general public.',
    icon: '🔑'
  },
  {
    id: 4,
    title: 'Exclusive Offers',
    description: 'Receive special discounts, promotional codes, and offers available only to loyalty members.',
    icon: '🏷️'
  },
  {
    id: 5,
    title: 'Birthday Gifts',
    description: 'Celebrate your special day with a complimentary gift or discount during your birthday month.',
    icon: '🎁'
  },
  {
    id: 6,
    title: 'VIP Support',
    description: 'Get priority customer service with dedicated support representatives for higher tier members.',
    icon: '👨‍💼'
  },
  {
    id: 7,
    title: 'Member Events',
    description: 'Invitations to exclusive online and in-person events, product launches, and workshops.',
    icon: '🎭'
  },
  {
    id: 8,
    title: 'Referral Bonuses',
    description: 'Earn additional points when you refer friends and family to join our community.',
    icon: '👥'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const LoyaltyBenefits = () => {
  return (
    <div className={styles.benefitsSection}>
      <h2 className={styles.sectionTitle}>Program Benefits</h2>
      <p className={styles.sectionDescription}>
        Discover all the amazing perks and benefits available to our loyalty program members. 
        The higher your tier, the more benefits you unlock!
      </p>
      
      <motion.div 
        className={styles.benefitsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map((benefit) => (
          <motion.div 
            key={benefit.id} 
            className={styles.benefitCard}
            variants={itemVariants}
          >
            <div className={styles.benefitIcon}>{benefit.icon}</div>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.benefitDescription}>{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <div className={styles.callToAction}>
        <h3>Ready to start earning rewards?</h3>
        <p>Join our loyalty program today and begin your journey toward exclusive benefits and perks!</p>
        <button className={styles.enrollButton}>Enroll Now</button>
      </div>
    </div>
  );
};

export default LoyaltyBenefits; 