import Link from 'next/link';
import styles from './ProductGrid.module.scss';
import { useCart } from '../../context/CartContext';

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();

  return (
      <div className={styles.grid}>
        {products.map((product) => (
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
                    className={styles.addToCartButton}
                    onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default ProductGrid;