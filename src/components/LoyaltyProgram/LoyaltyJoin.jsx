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
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePhone = (phone) => {
    // Allow empty phone as it's optional
    if (!phone) return true;
    
    // Check if phone contains only numbers and special characters (+, -, space, parentheses)
    const phoneRegex = /^[0-9+\-\s()]*$/;
    return phoneRegex.test(phone);
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (name === 'email' || name === 'phone') {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Validate phone as user types
    if (name === 'phone' && value) {
      if (!validatePhone(value)) {
        setFormErrors(prev => ({
          ...prev,
          phone: 'Phone number can only contain digits and special characters (+, -, spaces)'
        }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields before submission
    let isValid = true;
    const newErrors = {
      email: '',
      phone: ''
    };
    
    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate phone (if provided)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number can only contain digits and special characters (+, -, spaces)';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    
    if (isValid) {
      // Здесь будет логика отправки данных на сервер
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
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
                  {formErrors.email && <div className={styles.errorMessage}>{formErrors.email}</div>}
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
                  {formErrors.phone && <div className={styles.errorMessage}>{formErrors.phone}</div>}
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