import styles from './FeaturedProducts.module.scss'

const products = [
  {
    id: 1,
    name: "MARS PRO",
    price: "229.99",
    image: "/images/mars-pro.png",
    description: "Premium Gaming Speaker"
  },
  {
    id: 2,
    name: "VENUS ENGINE",
    price: "199.99",
    image: "/images/venus-engine.png",
    description: "Portable Bluetooth Speaker"
  },
  {
    id: 3,
    name: "SIRIUS PRO",
    price: "149.99",
    image: "/images/sirius-pro.png",
    description: "True Wireless Earbuds"
  }
]

const FeaturedProducts = () => {
  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <h2>FEATURED PRODUCTS</h2>
        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.product}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.info}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className={styles.price}>${product.price}</span>
                <button className={styles.buyButton}>BUY NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts 