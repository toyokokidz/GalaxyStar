import styles from './HandcraftShowcase.module.scss'

const HandCraftShowcase = () => {
  return (
    <section className="container">
      <div className={styles.displaySection}>
        <img src="/images/handcraft-block.jpg" alt="HandCraft Display" />
      </div>
    </section>
  )
}

export default HandCraftShowcase