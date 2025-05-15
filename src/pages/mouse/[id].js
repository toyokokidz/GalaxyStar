import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import mouseData from '../../data/mouse.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductActions from '../../components/ProductActions/ProductActions';

const MousePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [mouse, setMouse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const foundMouse = mouseData.find(item =>
            item.id === parseInt(id) || item.link?.endsWith(id)
        );

        if (!foundMouse) {
            router.push('/404');
            return;
        }

        setMouse(foundMouse);
        setLoading(false);
    }, [id, router]);

    if (loading || !mouse) {
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
                <Link href="/">Home/</Link>
                <Link href="/mouse">Mouse/</Link>
                <span>{mouse.name}</span>
            </div>

            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <div className={styles.mainImageWrapper}>
                        <Image
                            src={mouse.image}
                            alt={mouse.name}
                            width={600}
                            height={600}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.productTitle}>
                        {mouse.title || mouse.name}
                    </h1>

                    <ProductActions
                        product={mouse}
                        category="mouse"
                    />
                </div>
            </div>
        </div>
    );
};

export default MousePage;