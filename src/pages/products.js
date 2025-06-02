import { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader/SkeletonLoader';
import { useCartWithToast } from '../hooks/useCartWithToast';
import { useToast } from '../context/ToastContext';
import styles from '../styles/Products.module.scss';

// Пример данных товаров
const sampleProducts = [
  {
    id: 1,
    name: 'Gaming Keyboard RGB',
    description: 'Механическая клавиатура с RGB подсветкой',
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    image: '/images/keyboard1.jpg'
  },
  {
    id: 2,
    name: 'Wireless Gaming Mouse',
    description: 'Беспроводная игровая мышь с высокой точностью',
    price: 79.99,
    image: '/images/mouse1.jpg'
  },
  {
    id: 3,
    name: 'Gaming Headset',
    description: 'Профессиональная игровая гарнитура',
    price: 99.99,
    originalPrice: 119.99,
    discount: 17,
    image: '/images/headset1.jpg'
  },
  {
    id: 4,
    name: 'Gaming Mousepad',
    description: 'Большой игровой коврик для мыши',
    price: 29.99,
    image: '/images/mousepad1.jpg'
  }
];

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartWithToast();
  const { showInfo, showSuccess } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleQuickView = (product) => {
    showInfo(`Быстрый просмотр: ${product.name}`);
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Имитируем загрузку
    setTimeout(() => {
      setLoading(false);
      showSuccess('Загружено больше товаров!');
    }, 2000);
  };

  return (
    <div className={styles.productsPage}>
      <div className="container">
        <div className={styles.header}>
          <h1>Наши товары</h1>
          <p>Лучшая игровая периферия для профессионалов</p>
        </div>

        <div className={styles.controls}>
          <button 
            className={styles.demoButton}
            onClick={() => showSuccess('Это пример успешного уведомления!')}
          >
            Показать Success Toast
          </button>
          <button 
            className={styles.demoButton}
            onClick={() => showInfo('Это информационное уведомление')}
          >
            Показать Info Toast
          </button>
        </div>

        <div className={styles.productsGrid}>
          {sampleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
            />
          ))}
          
          {loading && (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          )}
        </div>

        <div className={styles.loadMore}>
          <button 
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 