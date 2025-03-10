import styles from './Footer.module.scss'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3>Support</h3>
            <Link href="/download" className={styles.link}>Software Download</Link>
            <Link href="/faq" className={styles.link}>FAQ</Link>
            <Link href="/warranty" className={styles.link}>Warranty</Link>
            <Link href="/shipping" className={styles.link}>Shipping</Link>
            <Link href="/return-policy" className={styles.link}>Return Policy</Link>
            <Link href="/privacy" className={styles.link}>Privacy</Link>
          </div>

          <div className={styles.column}>
            <h3>About</h3>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/press" className={styles.link}>Press</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.column}>
            <h3>Contact Us</h3>
            <a href="mailto:service@galaxystar.com" className={styles.link}>
              Please email<br />service@galaxystar.com
            </a>
          </div>

          <div className={styles.column}>
            <h3>Explore</h3>
            <Link href="/discord" className={styles.link}>Discord Community</Link>
            <Link href="/marketplace" className={styles.link}>Also Selling Here</Link>
            <Link href="/loyalty" className={styles.link}>Loyalty Page</Link>
          </div>

          <div className={styles.column}>
            <h3>Get Updated</h3>
            <div className={styles.subscribe}>
              <input type="email" placeholder="E-mail" />
              <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.social}>
            <Link href="/" className={styles.socialLink}>Facebook</Link>
            <Link href="/" className={styles.socialLink}>Twitter</Link>
            <Link href="/" className={styles.socialLink}>Instagram</Link>
            <Link href="/" className={styles.socialLink}>Pinterest</Link>
            <Link href="/" className={styles.socialLink}>YouTube</Link>
            <Link href="/" className={styles.socialLink}>TikTok</Link>
          </div>

          <div className={styles.copyright}>
            <span>© 2025, GalaxyStar</span>
            <div className={styles.payments}>
              <a href="https://www.paypal.com/paypalme/GalaxyStar" alt="Payment methods" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 