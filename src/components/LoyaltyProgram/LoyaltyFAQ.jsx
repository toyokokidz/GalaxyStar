import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoyaltyFAQ.module.scss';

const faqItems = [
  {
    question: 'How do I join the loyalty program?',
    answer: 'Joining our loyalty program is free and easy! Simply create an account on our website, and you are automatically enrolled in our program. You will start at the Stardust tier and can progress to higher tiers as you earn more points.'
  },
  {
    question: 'How do I earn points?',
    answer: 'You earn points through various activities: 1 point for every $1 spent on purchases, 500 points for writing a review, 250 points for referring a friend who makes a purchase, and 100 points for sharing our products on social media.'
  },
  {
    question: 'When do my points expire?',
    answer: 'Points are valid for 12 months from the date they were earned. Your tier status is evaluated every six months based on your point accumulation during that period.'
  },
  {
    question: 'How do I redeem my points?',
    answer: 'You can redeem your points during checkout. Simply select the "Use Points" option and choose how many points you want to apply to your purchase. Each point is worth $0.01 in store credit.'
  },
  {
    question: 'Can I transfer my points to someone else?',
    answer: 'Currently, points cannot be transferred between accounts. Points are tied to the account that earned them.'
  },
  {
    question: 'What happens to my points if I return an item?',
    answer: 'If you return an item, the points you earned for that purchase will be deducted from your account. If you used points to pay for an item that you later return, those points will be credited back to your account.'
  },
  {
    question: 'How do I check my current point balance?',
    answer: 'You can check your current point balance and tier status in your account dashboard under the "My Rewards" section.'
  },
  {
    question: 'Do I get points for shipping and taxes?',
    answer: 'Points are earned on the product subtotal only, excluding shipping costs, taxes, and other fees.'
  }
];

const LoyaltyFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      <p className={styles.sectionDescription}>
        Find answers to common questions about our loyalty program. 
        If you can't find what you're looking for, please contact our support team.
      </p>
      
      <div className={styles.faqContainer}>
        {faqItems.map((faq, index) => (
          <div 
            key={index} 
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
          >
            <button 
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
            >
              {faq.question}
              <span className={styles.faqIcon}>
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div 
                  className={styles.faqAnswer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.faqAnswerContent}>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className={styles.contactInfo}>
        <h3>Still have questions?</h3>
        <p>
          Our support team is here to help! Reach out to us at 
          <a href="mailto:support@galaxystar.com" className={styles.emailLink}>
            support@galaxystar.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoyaltyFAQ; 