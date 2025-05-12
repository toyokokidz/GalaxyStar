import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './LoyaltyJoin.module.scss';

const LoyaltyJoin = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreement: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };
  
  return (
    <section className={styles.joinSection}>
      <div className={styles.joinContainer}>
        <div className={styles.joinContent}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Join Our Loyalty Program Today</h2>
            <p>
              Start earning rewards, get exclusive access to new products, 
              special promotions, and more. It's free to join!
            </p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>Free to join, no membership fees</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>Earn points with every purchase</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>Redeem points for discounts</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>Exclusive member-only offers</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={styles.enrollForm}>
                <h3>Enroll Now</h3>
                
                <div className={styles.formGroup}>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                  />
                </div>
                
                <div className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreement">
                    I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
                  </label>
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Join Loyalty Program
                </button>
              </form>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Thank You for Joining!</h3>
                <p>
                  Your enrollment in our loyalty program has been submitted successfully. 
                  You'll receive a confirmation email shortly with details about your membership.
                </p>
                <p className={styles.startShopping}>
                  Start shopping now to earn your first points!
                </p>
                <button 
                  className={styles.shopButton}
                  onClick={() => window.location.href = '/'}
                >
                  Shop Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyJoin; 