import styles from './VideoShowcase.module.scss'

const VideoShowcase = () => {
  return (
    <section className={styles.showcase}>
      <div className={styles.videoGrid}>
        <div className={styles.videoItem}>
          <video autoPlay loop muted playsInline>
            <source src="/videos/showcase-1.mp4" type="video/mp4" />
          </video>
          <div className={styles.content}>
            <h3>IMMERSIVE SOUND</h3>
            <p>360° Audio Experience</p>
          </div>
        </div>
        <div className={styles.videoItem}>
          <video autoPlay loop muted playsInline>
            <source src="/videos/showcase-2.mp4" type="video/mp4" />
          </video>
          <div className={styles.content}>
            <h3>FUTURISTIC DESIGN</h3>
            <p>Sci-Fi Inspired Aesthetics</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoShowcase 