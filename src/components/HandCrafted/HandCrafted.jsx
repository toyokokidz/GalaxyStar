import Link from 'next/link'
import styles from './HandCrafted.module.scss'

const products = [
  {
    id: 1,
    name: 'Galaxy W1 Pro Yellow',
    price: '$159.99',
    image: '/images/mechanical-keyboard-yellow.jpg',
    tag: 'NEW ARRIVAL',
    link: '/keyboard/galaxy-w1-pro-yellow'
  },
  {
    id: 2,
    name: 'Galaxy Mouse Yellow',
    price: '$89.99',
    image: '/images/galaxy-mouse-yellow.jpg',
    tag: 'NEW ARRIVAL',
    link: '/mouse/galaxy-mouse-yellow'
  },
  {
    id: 3,
    name: 'Galaxy Mouse Black',
    price: '$89.99',
    image: '/images/galaxy-mouse-black.jpg',
    tag: 'NEW ARRIVAL',
    link: '/mouse/galaxy-mouse-black'
  },
  {
    id: 4,
    name: 'Galaxy MousePad',
    price: '$29.99',
    image: '/images/galaxy-mousepad.jpg',
    link: '/mousepad/galaxy-mousepad'
  }
]

const HandCrafted = () => {
  return (
    <section className={styles.handcrafted}>
      <div className="container">
        <div className={styles.header}>
          <h2>HandCrafted</h2>
          <Link href="/handcrafted" className={styles.viewAll}>
            View all
          </Link>
        </div>
        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.product}>
              <Link href={product.link} className={styles.imageWrapper}>
                {product.tag && <span className={styles.tag}>{product.tag}</span>}
                <img 
                  src={product.image} 
                  alt={product.name}
                />
              </Link>
              <div className={styles.textContent}>
                <div className={styles.title}>{product.name}</div>
                <p className={styles.price}>From {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HandCrafted 