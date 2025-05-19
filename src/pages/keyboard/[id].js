import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import keyboardData from '../../data/keyboard.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductActions from '../../components/ProductActions/ProductActions';

const KeyboardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const flexLinesRef = useRef([]);

  useEffect(() => {
    if (!id) return;

    const foundKeyboard = keyboardData.find(item =>
        item.id === parseInt(id) || item.link?.endsWith(id)
    );

    if (!foundKeyboard) {
      router.push('/404');
      return;
    }

    setKeyboard(foundKeyboard);
    setLoading(false);
  }, [id, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
    );

    flexLinesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      flexLinesRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  if (loading || !keyboard) {
    return (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          Loading product...
        </div>
    );
  }

  return (
      <div className={styles.productPageContainer}>
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link>
          <Link href="/keyboard">Keyboard</Link>
          <span>{keyboard.name}</span>
        </div>

        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <div className={styles.mainImageWrapper}>
              <Image
                  src={keyboard.image}
                  alt={keyboard.name}
                  border-radius={15}
                  width={600}
                  height={600}
                  priority
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.productTitle}>
              {keyboard.title || keyboard.name}
            </h1>

            <ProductActions
                product={keyboard}
                category="keyboard"
            />
          </div>
        </div>

        {keyboard.id === 1 && (
            <div className={styles.container2}>
              <div className={styles.heading}>
                <span>Mercury K1 Pro - Galaxy Black</span>
                <h2>Feel the Aluminum Flow</h2>
              </div>

              <div className={styles.flexContainer}>
                <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                  <div className={styles.flexItem}>
                    <h3>Design From Outside</h3>
                    <p>The Mercury K1 Pro is forged from a strong yet lightweight aluminum alloy for the perfect balance of durability and portability.</p>
                  </div>
                  <div className={styles.flexItem}>
                    <img
                        src="/images/galaxy-keyboard-pro1.jpg"
                        alt="Mercury K1 Pro"
                        className={styles.image}
                    />
                  </div>
                </div>

                <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                  <div className={styles.flexItem}>
                    <img
                        src="/images/galaxy-keyboard-pro2.webp"
                        alt="Mercury K1 Pro"
                        className={styles.image}
                    />
                  </div>
                  <div className={styles.flexItem}>
                    <h3>Merge with the Machine</h3>
                    <p>Metal flows up and around the keys, wrapping them in quicksilver branches that flicker and shift against a brilliant aura of power.</p>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default KeyboardPage;