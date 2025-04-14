import React from 'react';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import styles from '../styles/Checkout.module.scss';

const CheckoutPage = () => {
  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage; 