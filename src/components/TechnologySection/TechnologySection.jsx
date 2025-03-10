import styles from './TechnologySection.module.scss'

const TechnologySection = () => {
  return (
    <section className={styles.technology}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>ADVANCED AUDIO TECHNOLOGY</h2>
          <p>Experience crystal-clear sound with our cutting-edge speaker technology</p>
          <ul className={styles.features}>
            <li>
              <span className={styles.icon}>🔊</span>
              <h3>RGB Lighting</h3>
              <p>Customizable lighting effects</p>
            </li>
            <li>
              <span className={styles.icon}>🎮</span>
              <h3>Gaming Mode</h3>
              <p>Ultra-low latency for gaming</p>
            </li>
            <li>
              <span className={styles.icon}>🔋</span>
              <h3>24H Battery</h3>
              <p>All-day playback time</p>
            </li>
          </ul>
        </div>
        <div className={styles.image}>
          <img src="/images/speaker-tech.png" alt="Speaker Technology" />
        </div>
      </div>
    </section>
  )
}

export default TechnologySection 