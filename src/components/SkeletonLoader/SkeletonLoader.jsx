import styles from './SkeletonLoader.module.scss';

const SkeletonLoader = ({ 
  variant = 'text', 
  width, 
  height, 
  borderRadius = '4px',
  className = '' 
}) => {
  const skeletonStyles = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '20px' : variant === 'title' ? '32px' : '100%'),
    borderRadius: variant === 'circle' ? '50%' : borderRadius
  };

  return (
    <div 
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={skeletonStyles}
    />
  );
};

// Компонент для карточки товара
export const ProductCardSkeleton = () => {
  return (
    <div className={styles.productCardSkeleton}>
      <SkeletonLoader variant="rectangular" height="300px" borderRadius="12px" />
      <div className={styles.content}>
        <SkeletonLoader variant="text" width="80%" height="24px" />
        <SkeletonLoader variant="text" width="60%" height="16px" />
        <div className={styles.priceRow}>
          <SkeletonLoader variant="text" width="100px" height="28px" />
          <SkeletonLoader variant="rectangular" width="40px" height="40px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
};

// Компонент для списка
export const ListSkeleton = ({ count = 3 }) => {
  return (
    <div className={styles.listSkeleton}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.listItem}>
          <SkeletonLoader variant="circle" width="48px" height="48px" />
          <div className={styles.listContent}>
            <SkeletonLoader variant="text" width="70%" />
            <SkeletonLoader variant="text" width="90%" height="16px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader; 