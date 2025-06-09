import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './StatsOverview.module.scss';
import PeopleIcon from '../Icons/PeopleIcon';
import DollarIcon from '../Icons/DollarIcon';
import BuyIcon from '../Icons/BuyIcon';
import ActivityIcon from '../Icons/ActivityIcon';

const StatCard = ({ title, value, change, icon, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = parseInt(value);
      const increment = end / 50;
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 30);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div 
      className={styles.statCard}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.icon}>{icon}</div>
        <span className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.value}>{displayValue.toLocaleString()}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </motion.div>
  );
};

export default function StatsOverview() {
  const stats = [
    {
      title: "Total Sales",
      value: "45673",
      change: 12.5,
      icon: <DollarIcon size={32} className={styles.svgIcon} />,
      delay: 0.1
    },
    {
      title: "Active Users",
      value: "2847",
      change: 8.2,
      icon: <PeopleIcon size={32} className={styles.svgIcon} />,
      delay: 0.2
    },
    {
      title: "Revenue",
      value: "89240",
      change: -2.1,
      icon: <ActivityIcon size={32} className={styles.svgIcon} />,
      delay: 0.3
    },
    {
      title: "Orders",
      value: "1562",
      change: 15.8,
      icon: <BuyIcon size={32} className={styles.svgIcon} />,
      delay: 0.4
    }
  ];

  return (
    <div className={styles.statsOverview}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Key Metrics
      </motion.h2>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
} 