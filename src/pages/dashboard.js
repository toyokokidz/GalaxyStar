import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Dashboard.module.scss';
import StatsOverview from '../components/Dashboard/StatsOverview/StatsOverview';
import LiveChart from '../components/Dashboard/LiveChart/LiveChart';
import SalesTicker from '../components/Dashboard/SalesTicker/SalesTicker';

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.dashboard}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <header className={styles.header}>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>Real-time business insights</p>
        </header>

        <div className={styles.grid}>
          <motion.div 
            className={styles.statsSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <StatsOverview />
          </motion.div>

          <motion.div 
            className={styles.chartSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <LiveChart />
          </motion.div>

          <motion.div 
            className={styles.tickerSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <SalesTicker />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 