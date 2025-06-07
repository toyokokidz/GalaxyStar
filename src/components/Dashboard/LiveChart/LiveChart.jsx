import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './LiveChart.module.scss';

export default function LiveChart() {
  const [data, setData] = useState([]);
  const [currentMetric, setCurrentMetric] = useState('sales');
  const intervalRef = useRef(null);

  const metrics = {
    sales: { label: 'Sales', color: '#7000FF', max: 100 },
    users: { label: 'Active Users', color: '#FF00B8', max: 50 },
    revenue: { label: 'Revenue', color: '#00D4FF', max: 150 }
  };

  const generateDataPoint = () => {
    const baseValue = metrics[currentMetric].max * 0.3;
    const variation = metrics[currentMetric].max * 0.4;
    return Math.random() * variation + baseValue;
  };

  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: generateDataPoint(),
      timestamp: Date.now() - (19 - i) * 2000
    }));
    setData(initialData);

    intervalRef.current = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        newData.push({
          x: prevData[prevData.length - 1].x + 1,
          y: generateDataPoint(),
          timestamp: Date.now()
        });
        return newData;
      });
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentMetric]);

  const maxY = Math.max(...data.map(d => d.y), metrics[currentMetric].max);
  const minY = Math.min(...data.map(d => d.y), 0);
  const range = maxY - minY;

  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((point.y - minY) / range) * 100;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaPath = `${pathData} L 100 100 L 0 100 Z`;

  return (
    <div className={styles.liveChart}>
      <div className={styles.chartHeader}>
        <div>
          <h2 className={styles.chartTitle}>Live Analytics</h2>
          <p className={styles.chartSubtitle}>Real-time data updates</p>
        </div>
        <div className={styles.metricTabs}>
          {Object.entries(metrics).map(([key, metric]) => (
            <button
              key={key}
              className={`${styles.metricTab} ${currentMetric === key ? styles.active : ''}`}
              onClick={() => setCurrentMetric(key)}
              style={{ '--metric-color': metric.color }}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <motion.svg
          className={styles.chart}
          viewBox="0 0 100 100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={metrics[currentMetric].color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={metrics[currentMetric].color} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={metrics[currentMetric].color} stopOpacity="0.7" />
              <stop offset="50%" stopColor={metrics[currentMetric].color} stopOpacity="1" />
              <stop offset="100%" stopColor={metrics[currentMetric].color} stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((point.y - minY) / range) * 100;
            return (
              <motion.circle
                key={point.x}
                cx={x}
                cy={y}
                r="0.8"
                fill={metrics[currentMetric].color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={styles.dataPoint}
              />
            );
          })}
        </motion.svg>

        <div className={styles.chartStats}>
          <div className={styles.currentValue}>
            <span className={styles.value}>
              {Math.round(data[data.length - 1]?.y || 0)}
            </span>
            <span className={styles.unit}>
              {currentMetric === 'revenue' ? '$' : currentMetric === 'users' ? ' users' : ' sales'}
            </span>
          </div>
          <div className={styles.trend}>
            <span className={styles.trendValue}>+12.5%</span>
            <span className={styles.trendLabel}>vs last hour</span>
          </div>
        </div>
      </div>
    </div>
  );
} 