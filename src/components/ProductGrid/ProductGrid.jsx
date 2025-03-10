import styles from './ProductGrid.module.scss'

const products = [
  {
    id: 1,
    name: 'Galaxy Mechanical Keyboard',
    image: '/images/mechanical-keyboard-black.jpg',
    size: 'large'
  },
  {
    id: 2,
    name: 'Galaxy Mouse',
    image: '/images/galaxy-mouse.jpg',
    size: 'medium'
  },
  {
    id: 3,
    name: 'MousePad',
    image: '/images/mousepad.jpg',
    size: 'medium'
  },
  {
    id: 4,
    name: 'Palmrest',
    image: '/images/palmrest.jpg',
    size: 'small'
  },
  {
    id: 5,
    name: 'Keycaps',
    image: '/images/keycaps.jpg',
    size: 'small'
  }
]

const ProductGrid = () => {
  return (
    <section className={styles.productGrid}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {products.map(product => (
            <div 
              key={product.id} 
              className={`${styles.item} ${styles[product.size]}`}
            >
              <img src={product.image} alt={product.name} />
              <div className={styles.name}>{product.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid 