import React, { useState, useEffect } from 'react';
import styles from './PaymentForm.module.scss';

const PaymentForm = () => {
  const [person, setPerson] = useState({
    email: '',
    phone: '',
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    nameOnCard: '',
    useShippingAddress: false,
    emailNewsOffers: false,
    textNewsOffers: false,
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  // Автоматическое заполнение имени на карте
  useEffect(() => {
    if (person.firstName && person.lastName) {
      setPerson((prev) => ({
        ...prev,
        nameOnCard: `${person.firstName} ${person.lastName}`,
      }));
    }
  }, [person.firstName, person.lastName]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const validateZipCode = (zipCode) => {
    const regex = /^\d{5}$/;
    return regex.test(zipCode);
  };

  const validateCardNumber = (cardNumber) => {
    const regex = /^\d{16}$/;
    return regex.test(cardNumber);
  };

  const validateCVC = (cvc) => {
    const regex = /^\d{3}$/;
    return regex.test(cvc);
  };

  // Автоматическое добавление слеша в Expiration date
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setPerson((prev) => ({ ...prev, expiryDate: value }));
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPerson((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка всех данных перед отправкой
    if (!validateEmail(person.email)) {
      alert('Пожалуйста, введите корректный email.');
      return;
    }
    if (!validatePhone(person.phone)) {
      alert('Пожалуйста, введите корректный номер телефона (10 цифр).');
      return;
    }
    if (!validateZipCode(person.zipCode)) {
      alert('Пожалуйста, введите корректный ZIP code (5 цифр).');
      return;
    }
    if (!validateCardNumber(person.cardNumber)) {
      alert('Пожалуйста, введите корректный номер карты (16 цифр).');
      return;
    }
    if (!validateCVC(person.cvc)) {
      alert('Пожалуйста, введите корректный CVC код (3 цифры).');
      return;
    }

    console.log('Форма отправлена', person);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form onSubmit={handleSubmit}>
        {/* Секция Contact */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <input
            type="email"
            name="email"
            placeholder="Email or mobile phone number"
            value={person.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="emailNewsOffers"
              checked={person.emailNewsOffers}
              onChange={handleInputChange}
              className={styles.checkboxInput}
            />
            Email me with news and offers
          </label>
        </div>

        {/* Секция Delivery */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Delivery</h2>
          <select
            name="country"
            value={person.country}
            onChange={handleInputChange}
            required
            className={styles.input}
          >
            <option value="">Country/Region</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="BR">Brazil</option>
          </select>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={person.firstName}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={person.lastName}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={person.address}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={person.apartment}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={person.city}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={person.state}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP code"
            value={person.zipCode}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={person.phone}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="textNewsOffers"
              checked={person.textNewsOffers}
              onChange={handleInputChange}
              className={styles.checkboxInput}
            />
            Text me with news and offers
          </label>
        </div>

        {/* Секция Shipping Method */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Shipping Method</h2>
          {person.firstName && person.lastName && person.address && person.city && person.state && person.zipCode ? (
            <p className={styles.sectionText}>Standard $6.00</p>
          ) : (
            <p className={styles.sectionText}>Enter your shipping address to view available shipping methods.</p>
          )}
        </div>

        {/* Секция Payment */}
        <div className={styles.paymentSection}>
          <h2 className={styles.paymentTitle}>Payment</h2>
          <p className={styles.paymentText}>All transactions are secure and encrypted.</p>
          <div className={styles.paymentMethods}>
            <button
              type="button"
              className={`${styles.paymentButton} ${paymentMethod === 'creditCard' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('creditCard')}
            >
              Credit Card
            </button>
            <button
              type="button"
              className={`${styles.paymentButton} ${paymentMethod === 'paypal' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('paypal')}
            >
              PayPal
            </button>
            <button
              type="button"
              className={`${styles.paymentButton} ${paymentMethod === 'gpay' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('gpay')}
            >
              G Pay
            </button>
          </div>

          {paymentMethod === 'creditCard' && (
            <>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={person.cardNumber}
                onChange={handleInputChange}
                required
                className={styles.paymentInput}
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiration date (MM / YY)"
                value={person.expiryDate}
                onChange={handleExpiryDateChange}
                required
                className={styles.paymentInput}
              />
              <input
                type="text"
                name="cvc"
                placeholder="Security code"
                value={person.cvc}
                onChange={handleInputChange}
                required
                className={styles.paymentInput}
              />
              <input
                type="text"
                name="nameOnCard"
                placeholder="Name on card"
                value={person.nameOnCard}
                onChange={handleInputChange}
                required
                className={styles.paymentInput}
              />
              <label className={styles.paymentCheckboxLabel}>
                <input
                  type="checkbox"
                  name="useShippingAddress"
                  checked={person.useShippingAddress}
                  onChange={handleInputChange}
                  className={styles.paymentCheckboxInput}
                />
                Use shipping address as billing address
              </label>
            </>
          )}

          {paymentMethod === 'paypal' && (
            <div className={styles.paypalSection}>
              <p>After clicking "Pay with PayPal", you will be redirected to PayPal to complete your purchase securely.</p>
            </div>
          )}

          {paymentMethod === 'gpay' && (
            <div className={styles.gpaySection}>
              <p>Google Pay selected. No additional card details required.</p>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;