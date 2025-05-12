import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoyaltyHero.module.scss';

const LoyaltyHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          GALAXY<span className={styles.accent}>REWARDS</span>
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Join our exclusive loyalty program and unlock stellar benefits
        </motion.p>
        
        <motion.div 
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>5%</span>
            <span className={styles.statLabel}>Cashback</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statNumber}>Free</span>
            <span className={styles.statLabel}>Shipping</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statNumber}>Early</span>
            <span className={styles.statLabel}>Access</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statNumber}>VIP</span>
            <span className={styles.statLabel}>Support</span>
          </div>
        </motion.div>
        
        <motion.button 
          className={styles.enrollButton}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ENROLL NOW
        </motion.button>
      </div>
    </section>
  );
};

export default LoyaltyHero; 