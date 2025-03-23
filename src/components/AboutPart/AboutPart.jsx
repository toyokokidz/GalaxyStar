import styles from './AboutPart.module.scss';

const AboutPart = () => {
  return (
    <section className={styles.aboutPart}>
      <div className={styles.fullWidthVideo}>
        <div className={styles.videoBlock}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className={styles.video}
          >
            <source src="/videos/start_AboutUs.mp4" type="video/mp4" />
          </video>
          <span className={styles.videoText}>About Us</span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentBlock}>
          <h1 className={styles.title}>Our Story</h1>
          <p className={styles.description}>
            The GravaStar team unites designers, craftsmen, artists, engineers, gamers, music lovers, and explorers. Together, we collaborate to create unique, cutting-edge products that blend creativity, technology, and passion.
          </p>
          </div>
        <div className={styles.flexContainer}>
          <div className={styles.flexLine}>
            <div className={styles.flexItem}>
              <h2>Be Cool, Play It!</h2>
              <p>It's more than a slogan; it's our brand's attitude towards life. At GravaStar, we break away from the ordinary, merging cutting-edge technology with unique designs. We inspire you to live boldly and creatively. Join us in making every day an adventure—Be Cool, Play It!</p>
            </div>
              <div className={styles.flexItem}>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className={styles.secondaryVideo}
                >
                  <source src="/videos/video2_AboutUs.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className={styles.flexLine}>
              <div className={styles.flexItem}>
                <img 
                  src="/images/image4.png" 
                  alt="video"  //надо добавить видео, я не искала
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h2>How We Started</h2>
                <p>In 2018, Yong, an industrial designer with over 20 years of experience and a passion for sci-fi and mecha aesthetics, envisioned GravaStar. Fueled by a desire to merge cutting-edge technology with everyday life, GravaStar was born.</p>
              </div>
            </div>
            <div className={styles.flexLine}>
              <div className={styles.flexItem}>
                <h2>How We Started</h2>
                <p>In 2018, Yong, an industrial designer with over 20 years of experience and a passion for sci-fi and mecha aesthetics, envisioned GravaStar. Fueled by a desire to merge cutting-edge technology with everyday life, GravaStar was born.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/Mars.png" 
                  alt="Mars" 
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.flexLine}>
              <div className={styles.flexItem}>
                <img 
                  src="/images/Alpha65.png" 
                  alt="Charger" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h2>Alpha65 - The Next-Gen Charger</h2>
                <p>From that inaugural product, GravaStar continued to innovate, introducing quirky speakers and unique desktop power adapters that challenged the norm. The products weren't just functional; they were collectible art pieces, each telling a story of a futuristic world merging with our own.</p>
              </div>
            </div>
            <div className={styles.flexLine}>
              <div className={styles.flexItem}>
                <h2>RedDot Award</h2>
                <p>Winning the Reddot Design Award for our Mercury gaming mice is a testament to our commitment to excellence in product design. This prestigious honor reflects our commitment to crafting innovative and stylish gaming peripherals that enhance the gaming experience. This award reaffirms our position as a leader in the gaming industry and motivates us to continue delivering exceptional products that inspire and delight.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/RedDot.png" 
                  alt="RedDot Award" 
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.flexLine}>
              <div className={styles.flexItem}>
                <img 
                  src="/images/lookingForward.png" 
                  alt="Looking Forward" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h2>Looking Forward</h2>
                <p>Our mission is to transform everyday products with futuristic style. We blend sci-fi aesthetics with innovation to create unique experiences. Join us in embracing a future-forward lifestyle where technology and art merge to redefine the ordinary.</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPart;