import React, { useState } from 'react';
import styles from './Support.module.scss';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

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
      // здесь для отправки
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(false);
      }, 5000);

    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contactInfo}>
        <h1 className={styles.header}>Contact Us</h1>
        <p className={styles.question}>Hi, how can we help?</p>
        <p className={styles.text}>
          For customer service, please reach out <b>service@galaxystar.com</b>
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
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

        {isSubmitted && (
          <div className={styles.successMessage}>
            Thank you! Your message has been sent.
          </div>
        )}

        <button 
          type="submit" 
          className={styles.button}
          disabled={!!errors.name || !!errors.email || !!errors.message}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Support;