import React, { useState, useEffect } from 'react';
import styles from './CheckoutForm.module.scss';
import { useCart } from '../../context/CartContext.jsx';
import Image from 'next/image';

// Import payment method icons
import ApplePay from '../../assets/checkout/ApplePay.svg';
import ShopPay from '../../assets/checkout/ShopPay.svg';
import GooglePay from '../../assets/checkout/GooglePay.svg';
import Visa from '../../assets/checkout/VISA.svg';
import Mastercard from '../../assets/checkout/MS.svg';
import AmEx from '../../assets/checkout/Am-ExPay.svg';
import Discover from '../../assets/checkout/Discover.svg';

const countryCodesMap = {
  '1': { code: 'US', name: 'United States' },
  '7': { code: 'RU', name: 'Russia' },
  '33': { code: 'FR', name: 'France' },
  '34': { code: 'ES', name: 'Spain' },
  '39': { code: 'IT', name: 'Italy' },
  '44': { code: 'GB', name: 'United Kingdom' },
  '46': { code: 'SE', name: 'Sweden' },
  '47': { code: 'NO', name: 'Norway' },
  '48': { code: 'PL', name: 'Poland' },
  '49': { code: 'DE', name: 'Germany' },
  '81': { code: 'JP', name: 'Japan' },
  '82': { code: 'KR', name: 'South Korea' },
  '86': { code: 'CN', name: 'China' },
  '91': { code: 'IN', name: 'India' },
  '351': { code: 'PT', name: 'Portugal' },
  '380': { code: 'UA', name: 'Ukraine' },
  '420': { code: 'CZ', name: 'Czech Republic' },
  '972': { code: 'IL', name: 'Israel' },
  // Add more country codes as needed
};

const cardPatterns = {
  visa: {
    pattern: /^4/,
    name: 'Visa',
    icon: Visa
  },
  mastercard: {
    pattern: /^5[1-5]/,
    name: 'Mastercard',
    icon: Mastercard
  },
  amex: {
    pattern: /^3[47]/,
    name: 'American Express',
    icon: AmEx
  },
  discover: {
    pattern: /^6(?:011|5)/,
    name: 'Discover',
    icon: Discover
  }
};

const detectCardType = (cardNumber) => {
  const number = cardNumber.replace(/\D/g, '');
  return Object.entries(cardPatterns).find(([_, card]) => 
    card.pattern.test(number)
  )?.[0] || null;
};

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [email, setEmail] = useState('');
  const [subscribeNews, setSubscribeNews] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [countryInfo, setCountryInfo] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const [cardNumber, setCardNumber] = useState('');

  const isShippingMethodDisabled = !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, shippingAddress });
  };

  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
      : item.price || 0;
    return sum + (price * (item.quantity || 1));
  }, 0);

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setShippingAddress({ ...shippingAddress, phone: phoneNumber });

    // Check for country code when number starts with +
    if (phoneNumber.startsWith('+')) {
      const code = phoneNumber.slice(1).match(/^\d+/)?.[0];
      if (code) {
        // Find the longest matching country code
        const matchingCode = Object.keys(countryCodesMap)
          .filter(prefix => code.startsWith(prefix))
          .sort((a, b) => b.length - a.length)[0];

        if (matchingCode) {
          setCountryInfo(countryCodesMap[matchingCode]);
        } else {
          setCountryInfo(null);
        }
      }
    } else {
      setCountryInfo(null);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const cardType = detectCardType(value);
    setCardInfo(cardType ? cardPatterns[cardType] : null);
    setCardNumber(value);
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutForm}>
        <div className={styles.expressCheckout}>
          <h2>Express checkout</h2>
          <div className={styles.expressButtons}>
            <button className={styles.applePayButton}>
              <ApplePay />
            </button>
            <button className={styles.shopPayButton}>
              <ShopPay />
            </button>
            <button className={styles.googlePayButton}>
              <GooglePay />
            </button>
          </div>
          <div className={styles.divider}>
            <span>or pay with card</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2>Contact</h2>
            <div className={styles.formGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or mobile phone number"
                required
                className={styles.input}
              />
            </div>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={subscribeNews}
                onChange={(e) => setSubscribeNews(e.target.checked)}
              />
              <span>Email me with news and offers</span>
            </label>
          </div>

          <div className={styles.section}>
            <h2>Delivery</h2>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                placeholder="First name"
                required
                className={styles.input}
              />
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                placeholder="Last name"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                placeholder="Address"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={shippingAddress.apartment}
                onChange={(e) => setShippingAddress({...shippingAddress, apartment: e.target.value})}
                placeholder="Apartment, suite, etc. (optional)"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                placeholder="City"
                required
                className={styles.input}
              />
              <input
                type="text"
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                placeholder="State"
                required
                className={styles.input}
              />
              <input
                type="text"
                value={shippingAddress.zipCode}
                onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                placeholder="ZIP code"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.phoneInputWrapper}>
                {countryInfo && (
                  <div className={styles.countryFlag}>
                    <Image
                      src={`https://flagcdn.com/w40/${countryInfo.code.toLowerCase()}.png`}
                      alt={countryInfo.name}
                      width={24}
                      height={16}
                    />
                    <span>{countryInfo.name}</span>
                  </div>
                )}
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={handlePhoneChange}
                  placeholder="Phone (e.g. +1234567890)"
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Shipping method</h2>
            <div className={styles.shippingMethodSection}>
              {isShippingMethodDisabled ? (
                <input
                  type="text"
                  placeholder="Enter your shipping address to view available shipping methods."
                  className={`${styles.input} ${styles.disabledInput}`}
                  disabled
                />
              ) : (
                <div className={styles.shippingMethods}>
                  <div className={`${styles.shippingMethod} ${selectedShipping === 'standard' ? styles.selected : ''}`}>
                    <input 
                      type="radio" 
                      name="shipping" 
                      id="standard" 
                      value="standard"
                      checked={selectedShipping === 'standard'}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                    />
                    <label htmlFor="standard">
                      <div className={styles.shippingInfo}>
                        <span className={styles.shippingName}>Standard Shipping</span>
                        <span className={styles.deliveryTime}>4-5 business days</span>
                      </div>
                      <span className={styles.shippingPrice}>$5.00</span>
                    </label>
                  </div>
                  <div className={`${styles.shippingMethod} ${selectedShipping === 'express' ? styles.selected : ''}`}>
                    <input 
                      type="radio" 
                      name="shipping" 
                      id="express" 
                      value="express"
                      checked={selectedShipping === 'express'}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                    />
                    <label htmlFor="express">
                      <div className={styles.shippingInfo}>
                        <span className={styles.shippingName}>Express Shipping</span>
                        <span className={styles.deliveryTime}>1-2 business days</span>
                      </div>
                      <span className={styles.shippingPrice}>$15.00</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.section} ${styles.paymentSection}`}>
            <h2>Payment</h2>
            <div className={styles.paymentHeader}>
              <p className={styles.secureNote}>All transactions are secure and encrypted.</p>
              <div className={styles.paymentCards}>
                <Visa />
                <Mastercard />
                <AmEx />
                <Discover />
                <span className={styles.moreMethods}>+4</span>
              </div>
            </div>
            <div className={styles.paymentForm}>
              <div className={styles.formGroup}>
                <div className={styles.cardInputWrapper}>
                  {cardInfo && (
                    <div className={styles.cardTypeIcon}>
                      {React.createElement(cardInfo.icon)}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Name on card"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Expiration date (MM/YY)"
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Security code"
                  className={styles.input}
                />
              </div>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>Use shipping address as billing address</span>
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Remember me</h2>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>Save my information for a faster checkout with a Shop account</span>
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Pay now
          </button>

          <p className={styles.terms}>
            Your info will be saved to a Shop account. By continuing, you agree to Shop's{' '}
            <a href="#">Terms of Service</a> and acknowledge the{' '}
            <a href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>

      <div className={styles.orderSummary}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => {
            const price = typeof item.price === 'string' 
              ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
              : item.price || 0;
            const itemTotal = price * (item.quantity || 1);

            return (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={64} 
                    height={64}
                    style={{ objectFit: 'cover' }}
                  />
                  <span className={styles.itemQuantity}>{item.quantity}</span>
                </div>
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>{item.variant}</p>
                </div>
                <div className={styles.itemPrice}>
                  ${itemTotal.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>USD ${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 