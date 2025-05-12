import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoyaltyHero from './LoyaltyHero';
import LoyaltyTiers from './LoyaltyTiers';
import LoyaltyNFTCards from './LoyaltyNFTCards';
import LoyaltyBenefits from './LoyaltyBenefits';
import LoyaltyFAQ from './LoyaltyFAQ';
import LoyaltyTestimonials from './LoyaltyTestimonials';
import LoyaltyJoin from './LoyaltyJoin';
import styles from './LoyaltyProgram.module.scss';

const LoyaltyProgram = () => {
  const [activeTab, setActiveTab] = useState('tiers');

  const tabs = [
    { id: 'tiers', label: 'Membership Tiers' },
    { id: 'nftcards', label: 'NFT Cards' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'faq', label: 'FAQ' },
    { id: 'testimonials', label: 'Member Stories' }
  ];

  return (
    <div className={styles.loyaltyProgram}>
      <LoyaltyHero />
      
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <motion.div 
          className={styles.tabContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'tiers' && <LoyaltyTiers />}
          {activeTab === 'nftcards' && <LoyaltyNFTCards />}
          {activeTab === 'benefits' && <LoyaltyBenefits />}
          {activeTab === 'faq' && <LoyaltyFAQ />}
          {activeTab === 'testimonials' && <LoyaltyTestimonials />}
        </motion.div>
      </div>
      
      <LoyaltyJoin />
    </div>
  );
};

export default LoyaltyProgram; 