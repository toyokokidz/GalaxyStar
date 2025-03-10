import styles from './Features.module.scss'

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2>WHY CHOOSE GRAVASTAR</h2>
        <div className={styles.grid}>
          <div className={styles.feature}>
            <div className={styles.icon}>🎮</div>
            <h3>Sci-Fi Design</h3>
            <p>Unique futuristic aesthetics that stand out</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>🔊</div>
            <h3>Premium Sound</h3>
            <p>Exceptional audio quality and clarity</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>⚡</div>
            <h3>Long Battery Life</h3>
            <p>Up to 24 hours of playtime</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 