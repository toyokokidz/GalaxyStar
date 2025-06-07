import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import accessoriesData from '../../data/accessoires.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductActions from '../../components/ProductActions/ProductActions';
import ProductSection from '../../components/ProductSection/ProductSection';

const AccessoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const foundAccessory = accessoriesData.find(item =>
        item.id === parseInt(id) || item.link?.endsWith(id)
    );

    if (!foundAccessory) {
      router.push('/404');
      return;
    }

    setAccessory(foundAccessory);
    setLoading(false);
  }, [id, router]);

  if (loading || !accessory) {
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
          <Link href="/accessoires">Accessories</Link>
          <span>{accessory.name}</span>
        </div>

        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <div className={styles.mainImageWrapper}>
              <Image
                  src={accessory.image}
                  alt={accessory.name}
                  width={600}
                  height={600}
                  priority
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.productTitle}>
              {accessory.title || accessory.name}
            </h1>

            <ProductActions
                product={accessory}
                category="accessories"
            />
          </div>
        </div>

        {[1, 2, 4, 7].includes(accessory.id) && (
            <ProductSection accessory={accessory} />
        )}
      </div>
  );
};

export default AccessoryPage;