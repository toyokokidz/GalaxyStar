import Link from 'next/link'
import styles from './Categories.module.scss'

const categories = [
  {
    id: 1,
    name: 'Galaxy Mechanical Keyboard',
    image: '/images/mechanical-keyboard-black.jpg',
    link: '/keyboard'
  },
  {
    id: 2,
    name: 'Galaxy Mouse',
    image: '/images/galaxy-mouse-dark.jpg',
    link: '/mouse'
  },
  {
    id: 3,
    name: 'Switches',
    image: '/images/mechanical-switch.jpg',
    link: '/switches'
  },
  {
    id: 4,
    name: 'Keycaps',
    image: '/images/hello-kitty-keycaps.jpg',
    link: '/keycaps'
  },
  {
    id: 5,
    name: 'MousePad',
    image: '/images/anime-mousepad.jpg',
    link: '/mousepad'
  }
]

const Categories = () => {
  return (
    <section id="categories" className={styles.categoriesSection}>
      <div className="container">
        <div className={styles.grid}>
          <Link href={categories[0].link} className={`${styles.category} ${styles.keyboard}`}>
            <div className={styles.imageWrapper}>
              <img src={categories[0].image} alt={categories[0].name} />
            </div>
            <h3 className={styles.title}>{categories[0].name}</h3>
          </Link>
          
          <Link href={categories[1].link} className={`${styles.category} ${styles.mouse}`}>
            <div className={styles.imageWrapper}>
              <img src={categories[1].image} alt={categories[1].name} />
            </div>
            <h3 className={styles.title}>{categories[1].name}</h3>
          </Link>
          
          <Link href={categories[2].link} className={`${styles.category} ${styles.switches}`}>
            <div className={styles.imageWrapper}>
              <img src={categories[2].image} alt={categories[2].name} />
            </div>
            <h3 className={styles.title}>{categories[2].name}</h3>
          </Link>
          
          <Link href={categories[3].link} className={`${styles.category} ${styles.keycaps}`}>
            <div className={styles.imageWrapper}>
              <img src={categories[3].image} alt={categories[3].name} />
            </div>
            <h3 className={styles.title}>{categories[3].name}</h3>
          </Link>
          
          <Link href={categories[4].link} className={`${styles.category} ${styles.mousepad}`}>
            <div className={styles.imageWrapper}>
              <img src={categories[4].image} alt={categories[4].name} />
            </div>
            <h3 className={styles.title}>{categories[4].name}</h3>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories