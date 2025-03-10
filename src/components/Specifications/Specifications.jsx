import styles from './Specifications.module.scss'

const Specifications = () => {
  return (
    <section className={styles.specs}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>TECHNICAL SPECIFICATIONS</h2>
          <div className={styles.grid}>
            <div className={styles.spec}>
              <h3>SOUND</h3>
              <ul>
                <li>Frequency: 20Hz-20KHz</li>
                <li>Driver Size: 52mm</li>
                <li>Impedance: 32Ω</li>
              </ul>
            </div>
            <div className={styles.spec}>
              <h3>BATTERY</h3>
              <ul>
                <li>Capacity: 2600mAh</li>
                <li>Play Time: Up to 24h</li>
                <li>Charging Time: 2.5h</li>
              </ul>
            </div>
            <div className={styles.spec}>
              <h3>CONNECTIVITY</h3>
              <ul>
                <li>Bluetooth 5.0</li>
                <li>Range: 10m</li>
                <li>Multi-device Pairing</li>
              </ul>
            </div>
            <div className={styles.spec}>
              <h3>FEATURES</h3>
              <ul>
                <li>RGB Lighting</li>
                <li>Touch Controls</li>
                <li>Voice Assistant</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <img src="/images/specs-diagram.png" alt="Product Specifications" />
        </div>
      </div>
    </section>
  )
}

export default Specifications 