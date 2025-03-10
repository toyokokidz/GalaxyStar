import styles from './HeroSection.module.scss'

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroSection}>
          <h1>Galaxy Gear</h1>
          <p>Discover the Perfect Fusion of Style and Performance</p>
          <button>Shop Now</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection