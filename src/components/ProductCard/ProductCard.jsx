import Link from 'next/link'
import styles from './ProductCard.module.scss'

const ProductCard = ({ product }) => {
  const { id, name, price, image, category } = product

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} />
        <div className={styles.overlay}>
          <button className={styles.quickView}>Quick View</button>
        </div>
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p className={styles.category}>{category}</p>
        <p className={styles.price}>${price}</p>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard 