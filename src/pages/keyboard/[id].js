import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import keyboardData from '../../data/keyboard.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductActions from '../../components/ProductActions/ProductActions';
import ProductSection from '../../components/ProductSection/ProductSection';

const KeyboardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);

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
                  width={600}
                  height={600}
                  priority
                  style={{ borderRadius: '15px' }}
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

        {keyboard.productDetails && <ProductSection product={keyboard} />}
      </div>
  );
};

export default KeyboardPage;