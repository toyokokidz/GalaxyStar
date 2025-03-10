import styles from './ArtTechnology.module.scss'

const ArtTechnology = () => {
  return (
    <section className={styles.artTech}>
      <div className={styles.imageSection}>
        <img src="https://source.unsplash.com/random/1200x800" alt="Technology" />
      </div>
      <div className={styles.textSection}>
        <h2>Where Art Meets Technology</h2>
        <p>At GalaxyStar, we blend advanced tech with unique designs. Our products combine functionality with stunning aesthetics.</p>
        <button className={styles.aboutUs}>About Us</button>
      </div>
    </section>
  )
}

export default ArtTechnology 