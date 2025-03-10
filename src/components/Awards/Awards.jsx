import styles from './Awards.module.scss'

const awards = [
  {
    id: 1,
    title: "Best Design Award",
    organization: "Tech Innovation 2023",
    image: "/images/award-1.png"
  },
  {
    id: 2,
    title: "Audio Excellence",
    organization: "Sound & Vision 2023",
    image: "/images/award-2.png"
  },
  {
    id: 3,
    title: "Innovation Award",
    organization: "CES 2023",
    image: "/images/award-3.png"
  }
]

const Awards = () => {
  return (
    <section className={styles.awards}>
      <div className={styles.container}>
        <h2>AWARDS & RECOGNITION</h2>
        <div className={styles.grid}>
          {awards.map(award => (
            <div key={award.id} className={styles.award}>
              <div className={styles.image}>
                <img src={award.image} alt={award.title} />
              </div>
              <h3>{award.title}</h3>
              <p>{award.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Awards 