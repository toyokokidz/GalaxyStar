import styles from './Newsletter.module.scss'

const Newsletter = () => {
  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2>JOIN THE REVOLUTION</h2>
        <p>Subscribe to get exclusive offers and latest updates</p>
        <form className={styles.form}>
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter 