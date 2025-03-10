import styles from './AboutSection.module.scss'
import Link from 'next/link'

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.videoBlock}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className={styles.video}
          >
            <source src="/videos/tech-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className={styles.contentBlock}>
          <h2 className={styles.title}>Where Art Meets Technology</h2>
          <p className={styles.description}>
            At GalaxyStar, we blend advanced tech with unique designs. Our products combine 
            sleek functionality with artistic elegance. Experience innovative craftsmanship with 
            GalaxyStar.
          </p>
          <Link href="/about" className={styles.button}>
            About Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 