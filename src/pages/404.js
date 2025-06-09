import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/404.module.scss';

export default function Custom404() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div 
          className={styles.errorCode}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        >
          <span className={styles.four}>4</span>
          <div className={styles.planet}>
            <div className={styles.ring} />
            <div className={styles.sphere} />
          </div>
          <span className={styles.four}>4</span>
        </div>

        <h1 className={styles.title}>Oops! Page lost in space</h1>
        <p className={styles.description}>
          Looks like this page flew off to another galaxy. 
          But don't worry, we'll help you get back home!
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          
          <button 
            onClick={() => router.back()} 
            className={styles.backButton}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go Back
          </button>
        </div>

        <div className={styles.searchSuggestion}>
          <p>Or try to find what you were looking for:</p>
          <div className={styles.quickLinks}>
            <Link href="/keyboard">Keyboards</Link>
            <Link href="/mouse">Mice</Link>
            <Link href="/accessoires">Accessories</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </div>

      <div className={styles.astronaut}>
        <div className={styles.astronautBody}>
          <div className={styles.helmet}>
            <div className={styles.visor} />
          </div>
          <div className={styles.arm} />
          <div className={styles.leg} />
        </div>
      </div>
    </div>
  );
} 