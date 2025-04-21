import React, { useState } from 'react';
import styles from './Support.module.scss';
import { motion } from 'framer-motion';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setIsSubmitted(false);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email (example@domain.com)';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form would be submitted:', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className={styles.wrapper}>
      <motion.div 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.mainTitle}>Support Center</h1>
        <p className={styles.subtitle}>How can we help you today?</p>
      </motion.div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'contact' ? styles.active : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Us
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'faq' ? styles.active : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'warranty' ? styles.active : ''}`}
          onClick={() => setActiveTab('warranty')}
        >
          Warranty
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'download' ? styles.active : ''}`}
          onClick={() => setActiveTab('download')}
        >
          Software Download
        </button>
      </div>

      <div className={styles.contentWrapper}>
        {activeTab === 'contact' && (
          <motion.div 
            className={styles.contactSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.contactInfo}>
              <h2 className={styles.header}>Get in Touch</h2>
              <p className={styles.question}>Hi, how can we help?</p>
              <p className={styles.text}>
                For customer service, please reach out to <b>service@galaxystar.com</b>
              </p>
              <div className={styles.contactMethods}>
                <div className={styles.method}>
                  <span className={styles.methodIcon}>📧</span>
                  <span>Email Support</span>
                </div>
                <div className={styles.method}>
                  <span className={styles.methodIcon}>💬</span>
                  <span>Live Chat</span>
                </div>
                <div className={styles.method}>
                  <span className={styles.methodIcon}>📞</span>
                  <span>Phone Support</span>
                </div>
              </div>
            </div>

            <motion.form 
              onSubmit={handleSubmit} 
              className={styles.form}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.errorInput : ''}
                    required
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.errorInput : ''}
                    required
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.errorInput : ''}
                  required
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <motion.button 
                type="submit" 
                className={`${styles.button} ${isSubmitted ? styles.success : ''}`}
                disabled={!!errors.name || !!errors.email || !!errors.message || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitted ? 'Message Sent Successfully!' : 'Send Message'}
              </motion.button>
            </motion.form>
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div 
            className={styles.faqSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              <div className={styles.faqItem}>
                <h3>How do I track my order?</h3>
                <p>You can track your order using the tracking number provided in your confirmation email.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What is your return policy?</h3>
                <p>We offer a 30-day return policy for all products. Items must be in their original condition.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>How do I contact customer support?</h3>
                <p>You can reach us via email at service@galaxystar.com or use our contact form above.</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'warranty' && (
          <motion.div 
            className={styles.warrantySection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.warrantyTitle}>Warranty Information</h2>
            <div className={styles.warrantyContent}>
              <p>All GalaxyStar products come with a 2-year limited warranty covering manufacturing defects.</p>
              <ul className={styles.warrantyList}>
                <li>2-year limited warranty</li>
                <li>Free shipping for warranty claims</li>
                <li>Quick replacement process</li>
                <li>24/7 support for warranty issues</li>
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === 'download' && (
          <motion.div 
            className={styles.downloadSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.downloadTitle}>Software Downloads</h2>
            <div className={styles.downloadGrid}>
              <div className={styles.downloadCard}>
                <h3>GalaxyStar Control Center</h3>
                <p>Customize RGB lighting, adjust audio settings, and update firmware.</p>
                <div className={styles.downloadInfo}>
                  <span>Latest Version: 2.1.0 (March 15, 2024)</span>
                  <span>Size: 45MB</span>
                  <span>Supported OS: Windows 10/11, macOS 12+</span>
                </div>
                <div className={styles.downloadButtons}>
                  <a href="/downloads/windows" className={styles.downloadButton}>
                    Download Win
                  </a>
                  <a href="/downloads/mac" className={styles.downloadButton}>
                    Download Mac
                  </a>
                </div>
              </div>
              
              <div className={styles.downloadCard}>
                <h3>Firmware Updates</h3>
                <p>Latest firmware updates for GalaxyStar devices.</p>
                <div className={styles.downloadInfo}>
                  <span>Latest Version: 1.2.3 (March 10, 2024)</span>
                  <span>Previous Version: 1.2.2 (Feb 28, 2024)</span>
                  <span>Changelog: Performance improvements</span>
                </div>
                <div className={styles.downloadButtons}>
                  <a href="/downloads/firmware/latest" className={styles.downloadButton}>
                    Download
                  </a>
                  <a href="/downloads/firmware/previous" className={styles.downloadButton}>
                    Previous Ver
                  </a>
                </div>
              </div>
              
              <div className={styles.downloadCard}>
                <h3>User Manuals</h3>
                <p>Detailed product documentation and user guides.</p>
                <div className={styles.downloadInfo}>
                  <span>Updated: March 2024</span>
                  <span>Available in: EN, ES, DE, FR</span>
                  <span>Format: PDF (5-10MB)</span>
                </div>
                <div className={styles.downloadButtons}>
                  <a href="/downloads/manuals/en" className={styles.downloadButton}>
                    English
                  </a>
                  <a href="/downloads/manuals/all" className={styles.downloadButton}>
                    All Languages
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Support;