import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SalesTicker.module.scss';
import BuyIcon from '../Icons/BuyIcon';

export default function SalesTicker() {
  const [sales, setSales] = useState([]);
  const [nextId, setNextId] = useState(1);

  const products = [
    { name: 'Gaming Keyboard Pro', price: 149 },
    { name: 'Ultra Mouse X1', price: 89 },
    { name: 'RGB Mousepad', price: 45 },
    { name: 'Mechanical Switches', price: 25 },
    { name: 'Wireless Headset', price: 199 },
    { name: 'Gaming Chair Elite', price: 399 }
  ];

  const locations = [
    'New York', 'London', 'Tokyo', 'Berlin', 'Paris', 
    'Sydney', 'Toronto', 'Moscow', 'Seoul', 'Dubai'
  ];

  const generateSale = () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    
    return {
      id: nextId,
      product: product.name,
      price: product.price,
      quantity,
      location,
      timestamp: new Date().toLocaleTimeString(),
      total: product.price * quantity
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newSale = generateSale();
      setSales(prev => [newSale, ...prev.slice(0, 4)]);
      setNextId(prev => prev + 1);
    }, 3000);

    setSales([generateSale()]);
    setNextId(2);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.salesTicker}>
      <div className={styles.header}>
        <h2 className={styles.title}>Live Sales</h2>
        <div className={styles.indicator}>
          <div className={styles.pulse}></div>
          <span>LIVE</span>
        </div>
      </div>

      <div className={styles.salesList}>
        <AnimatePresence mode="popLayout">
          {sales.map((sale) => (
            <motion.div
              key={sale.id}
              className={styles.saleItem}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              layout
            >
              <div className={styles.saleIcon}>
                <BuyIcon size={24} className={styles.svgIcon} />
              </div>
              <div className={styles.saleDetails}>
                <div className={styles.productName}>{sale.product}</div>
                <div className={styles.saleInfo}>
                  <span className={styles.quantity}>{sale.quantity}x</span>
                  <span className={styles.location}>📍 {sale.location}</span>
                  <span className={styles.time}>{sale.timestamp}</span>
                </div>
              </div>
              <div className={styles.saleAmount}>
                <span className={styles.price}>${sale.total}</span>
                <motion.div 
                  className={styles.newBadge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  NEW
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.footer}>
        <div className={styles.totalToday}>
          <span className={styles.label}>Today's Total</span>
          <span className={styles.amount}>$12,456</span>
        </div>
        <div className={styles.avgOrder}>
          <span className={styles.label}>Avg Order</span>
          <span className={styles.amount}>$89</span>
        </div>
      </div>
    </div>
  );
} 