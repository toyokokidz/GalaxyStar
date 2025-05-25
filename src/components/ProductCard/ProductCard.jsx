import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProductCard.module.scss';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onQuickView,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      className={`${styles.productCard} ${className}`}
      data-product-id={product.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.imageContainer}>
        {!imageLoaded && (
          <div className={styles.imageSkeleton}>
            <div className={styles.skeletonShimmer} />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        
        {/* Overlay с кнопками при hover */}
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className={styles.quickViewBtn}
            onClick={handleQuickView}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* Бейдж со скидкой */}
        {product.discount && (
          <motion.div
            className={styles.discountBadge}
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
          >
            -{product.discount}%
          </motion.div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        
        <div className={styles.priceRow}>
          <div className={styles.priceContainer}>
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice}</span>
            )}
            <span className={styles.currentPrice}>${product.price}</span>
          </div>
          
          <motion.button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 