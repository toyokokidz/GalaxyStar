import styles from './HandCraftDisplay.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const HandCraftDisplay = () => {
  return (
    <section className={styles.displaySection}>
      <div className={styles.borderWrapper}>
        <div className={styles.wrapper}>
          <Image 
            src="/images/handcraft-block.jpg"
            alt="HandCraft Display"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.content}>
            <span className={styles.subtitle}>Discover Art in Technology</span>
            <h2 className={styles.title}>HandCraft</h2>
            <Link href="/handcraft" className={styles.button}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HandCraftDisplay