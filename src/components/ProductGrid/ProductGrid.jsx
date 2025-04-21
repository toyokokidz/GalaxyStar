// ProductGrid.jsx
import React from 'react';
import Link from 'next/link';
import styles from './ProductGrid.module.scss';
import { useCart } from '../../context/CartContext.jsx';

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const getPriceValue = (product) => {
    return parseFloat((product.price_sale || product.price).replace('$', ''));
  };

  return (
      <div className={styles.grid}>
        {products.map((product) => {
          const price = getPriceValue(product);
          const isOutOfStock = price === 0;

          return (
              <div key={product.id} className={styles.product}>
                <Link href={product.link} className={styles.imageWrapper}>
                  {product.tag && <span className={styles.tag}>{product.tag}</span>}
                  {product.discount && <span className={styles.discount}>{product.discount}</span>}
                  <img
                      src={product.image}
                      alt={product.name}
                  />
                </Link>
                <div className={styles.textContent}>
                  <div className={styles.title}>{product.name}</div>
                  <div className={styles.textContentSale}>
                    {product.price_sale ? (
                        <>
                          <p className={styles.price_sale}>{product.price_sale}</p>
                          <s className={styles.price_old}>{product.price_old}</s>
                        </>
                    ) : (
                        <p className={styles.price}>{product.price}</p>
                    )}
                  </div>
                  <button
                      className={`${styles.addToCartButton} ${isOutOfStock ? styles.outOfStock : ''}`}
                      onClick={() => !isOutOfStock && handleAddToCart(product)}
                      disabled={isOutOfStock}
                  >
                    {isOutOfStock ? 'Out of stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default ProductGrid;