import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  defs
} from 'recharts';
import styles from './LiveChart.module.scss';

// Кастомный Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipValue}>{`${Math.round(payload[0].value)}`}</p>
        <p className={styles.tooltipLabel}>{payload[0].payload.label}</p>
      </div>
    );
  }
  return null;
};

// Кастомная точка
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  
  return (
    <g>
      <circle 
        cx={cx} 
        cy={cy} 
        r={3} 
        fill="url(#pointGradient)" 
        strokeWidth={2}
        stroke="rgba(255,255,255,0.8)"
        style={{
          filter: 'drop-shadow(0 0 6px rgba(112, 0, 255, 0.6))'
        }}
      />
      <circle 
        cx={cx} 
        cy={cy} 
        r={8} 
        fill="none" 
        stroke="rgba(112, 0, 255, 0.3)"
        strokeWidth={1}
        className={styles.pulsingDot}
      />
    </g>
  );
};

export default function LiveChart() {
  const [data, setData] = useState([]);
  const [currentMetric, setCurrentMetric] = useState('sales');
  const [timeRange, setTimeRange] = useState('live');
  const intervalRef = useRef(null);

  const metrics = {
    sales: { 
      label: 'Sales', 
      color: '#7000FF', 
      max: 100,
      gradient: ['#7000FF', '#9B59B6']
    },
    users: { 
      label: 'Active Users', 
      color: '#FF00B8', 
      max: 50,
      gradient: ['#FF00B8', '#E91E63']
    },
    revenue: { 
      label: 'Revenue', 
      color: '#00D4FF', 
      max: 150,
      gradient: ['#00D4FF', '#3498DB']
    }
  };

  const timeRanges = {
    live: { label: 'Live', points: 20, interval: 2000, unit: 'sec' },
    '7d': { label: '7 Days', points: 7, interval: null, unit: 'day' },
    '14d': { label: '14 Days', points: 14, interval: null, unit: 'day' },
    '1m': { label: '1 Month', points: 30, interval: null, unit: 'day' },
    '3m': { label: '3 Months', points: 12, interval: null, unit: 'week' },
    '1y': { label: '1 Year', points: 12, interval: null, unit: 'month' },
    'all': { label: 'All Time', points: 24, interval: null, unit: 'month' }
  };

  const generateDataPoint = (baseVariation = 1) => {
    const baseValue = metrics[currentMetric].max * 0.3;
    const variation = metrics[currentMetric].max * 0.4 * baseVariation;
    return Math.random() * variation + baseValue;
  };

  // Генерация исторических данных
  const generateHistoricalData = (range) => {
    const config = timeRanges[range];
    const now = new Date();
    const data = [];

    for (let i = config.points - 1; i >= 0; i--) {
      let date;
      let label;
      let name;
      
      switch (config.unit) {
        case 'sec':
          date = new Date(now.getTime() - i * 2000);
          label = date.toLocaleTimeString();
          name = i;
          break;
        case 'day':
          date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          label = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
          name = label;
          break;
        case 'week':
          date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
          label = `W${Math.ceil((config.points - i) / 4)}`;
          name = label;
          break;
        case 'month':
          date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          label = date.toLocaleDateString('ru-RU', { month: 'short', year: '2-digit' });
          name = label;
          break;
        default:
          date = now;
          label = 'Now';
          name = 'Now';
      }

      // Добавляем тренд для долгосрочных данных
      const trendFactor = range === 'all' || range === '1y' ? 1 + (config.points - i) * 0.02 : 1;
      const seasonality = Math.sin((config.points - i) / config.points * Math.PI * 4) * 0.3 + 1;
      
      data.push({
        name: name,
        value: generateDataPoint(trendFactor * seasonality),
        label: label,
        timestamp: date.getTime()
      });
    }

    return data;
  };

  useEffect(() => {
    // Очищаем интервал при смене диапазона
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (timeRange === 'live') {
      // Live режим
      const initialData = Array.from({ length: 20 }, (_, i) => ({
        name: i,
        value: generateDataPoint(),
        label: new Date(Date.now() - (19 - i) * 2000).toLocaleTimeString(),
        timestamp: Date.now() - (19 - i) * 2000
      }));
      setData(initialData);

      intervalRef.current = setInterval(() => {
        setData(prevData => {
          const newData = [...prevData.slice(1)];
          const newPoint = {
            name: prevData[prevData.length - 1].name + 1,
            value: generateDataPoint(),
            label: new Date().toLocaleTimeString(),
            timestamp: Date.now()
          };
          newData.push(newPoint);
          return newData;
        });
      }, 2000);
    } else {
      // Исторические данные
      const historicalData = generateHistoricalData(timeRange);
      setData(historicalData);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentMetric, timeRange]);

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = previousValue ? ((currentValue - previousValue) / previousValue * 100) : 0;

  return (
    <div className={styles.liveChart}>
      <div className={styles.chartHeader}>
        <div>
          <h2 className={styles.chartTitle}>Analytics Overview</h2>
          <p className={styles.chartSubtitle}>
            {timeRange === 'live' ? 'Real-time data updates' : `Historical data - ${timeRanges[timeRange].label}`}
          </p>
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

      {/* Переключатель временных периодов */}
      <div className={styles.timeRangeSelector}>
        {Object.entries(timeRanges).map(([key, range]) => (
          <button
            key={key}
            className={`${styles.timeRangeBtn} ${timeRange === key ? styles.active : ''}`}
            onClick={() => setTimeRange(key)}
          >
            {range.label}
            {key === 'live' && <span className={styles.liveDot}></span>}
          </button>
        ))}
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="70%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metrics[currentMetric].color} stopOpacity={0.4} />
                <stop offset="50%" stopColor={metrics[currentMetric].color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={metrics[currentMetric].color} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={metrics[currentMetric].gradient[0]} stopOpacity={0.8} />
                <stop offset="50%" stopColor={metrics[currentMetric].color} stopOpacity={1} />
                <stop offset="100%" stopColor={metrics[currentMetric].gradient[1]} stopOpacity={0.8} />
              </linearGradient>
              <radialGradient id="pointGradient">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor={metrics[currentMetric].color} stopOpacity="1" />
                <stop offset="100%" stopColor={metrics[currentMetric].color} stopOpacity="0.7" />
              </radialGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth={0.5}
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              interval={timeRange === 'live' ? 'preserveStartEnd' : 'preserveEnd'}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              domain={['dataMin - 10', 'dataMax + 10']}
              hide
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Средняя линия */}
            <ReferenceLine 
              y={metrics[currentMetric].max * 0.5} 
              stroke="rgba(255,255,255,0.2)" 
              strokeDasharray="2 2" 
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#strokeGradient)"
              strokeWidth={3}
              fill="url(#areaGradient)"
              dot={timeRange === 'live' ? <CustomDot /> : false}
              activeDot={{ 
                r: 6, 
                fill: metrics[currentMetric].color,
                stroke: '#fff',
                strokeWidth: 2,
                style: {
                  filter: `drop-shadow(0 0 8px ${metrics[currentMetric].color})`
                }
              }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className={styles.chartStats}>
          <div className={styles.currentValue}>
            <span className={styles.value}>
              {Math.round(currentValue)}
            </span>
            <span className={styles.unit}>
              {currentMetric === 'revenue' ? '$' : currentMetric === 'users' ? ' users' : ' sales'}
            </span>
          </div>
          <div className={styles.trend}>
            <span className={`${styles.trendValue} ${change >= 0 ? styles.positive : styles.negative}`}>
              {change >= 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className={styles.trendLabel}>
              {timeRange === 'live' ? 'vs last update' : 'vs previous period'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 