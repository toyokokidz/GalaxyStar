import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductShowcase.module.scss'

const products = [
  {
    id: 1,
    name: "Mars Pro",
    price: "299.99",
    image: "/products/mars-pro.png",
    category: "speakers"
  },
  {
    id: 2,
    name: "Venus Engine",
    price: "199.99",
    image: "/products/venus-engine.png",
    category: "speakers"
  },
  {
    id: 3,
    name: "Apollo",
    price: "149.99",
    image: "/products/apollo.png",
    category: "earbuds"
  }
]

const ProductShowcase = () => {
  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <h2>FEATURED PRODUCTS</h2>
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase 