import React, { useState, useEffect } from 'react';
import styles from './PaymentForm.module.scss';

const PaymentForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [useShippingAddress, setUseShippingAddress] = useState(false);
  const [emailNewsOffers, setEmailNewsOffers] = useState(false); 
  const [textNewsOffers, setTextNewsOffers] = useState(false); 
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  // Автоматическое заполнение имени на карте
  useEffect(() => {
    if (firstName && lastName) {
      setNameOnCard(`${firstName} ${lastName}`);
    }
  }, [firstName, lastName]);

  // Проверка email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Проверка номера телефона
  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  // Проверка ZIP code
  const validateZipCode = (zipCode) => {
    const regex = /^\d{5}$/;
    return regex.test(zipCode);
  };

  // Проверка номера карты
  const validateCardNumber = (cardNumber) => {
    const regex = /^\d{16}$/;
    return regex.test(cardNumber);
  };

  // Проверка CVC
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
    setExpiryDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка всех данных перед отправкой
    if (!validateEmail(email)) {
      alert('Пожалуйста, введите корректный email.');
      return;
    }
    if (!validatePhone(phone)) {
      alert('Пожалуйста, введите корректный номер телефона (10 цифр).');
      return;
    }
    if (!validateZipCode(zipCode)) {
      alert('Пожалуйста, введите корректный ZIP code (5 цифр).');
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      alert('Пожалуйста, введите корректный номер карты (16 цифр).');
      return;
    }
    if (!validateCVC(cvc)) {
      alert('Пожалуйста, введите корректный CVC код (3 цифры).');
      return;
    }

    // Обработка данных формы
    console.log('Форма отправлена');
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
            placeholder="Email or mobile phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={emailNewsOffers}
              onChange={(e) => setEmailNewsOffers(e.target.checked)}
              className={styles.checkboxInput}
            />
            Email me with news and offers
          </label>
        </div>

        {/* Секция Delivery */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Delivery</h2>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Country/Region</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="BR">Brazil</option>
            {/* Можно добавить еще стран */}
          </select>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={styles.input}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={textNewsOffers}
              onChange={(e) => setTextNewsOffers(e.target.checked)}
              className={styles.checkboxInput}
            />
            Text me with news and offers
          </label>
        </div>

        {/* Секция Shipping Method */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Shipping Method</h2>
          {firstName && lastName && address && city && state && zipCode ? (
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
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className={styles.paymentInput}
              />
              <input
                type="text"
                placeholder="Expiration date (MM / YY)"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                required
                className={styles.paymentInput}
              />
              <input
                type="text"
                placeholder="Security code"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
                className={styles.paymentInput}
              />
              <input
                type="text"
                placeholder="Name on card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                required
                className={styles.paymentInput}
              />
              <label className={styles.paymentCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={useShippingAddress}
                  onChange={(e) => setUseShippingAddress(e.target.checked)}
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