import { useState } from 'react';
import styles from './Accessoires.module.scss'
import accessoiresProducts from '../../data/accessoires.json';
import SortControls from '../SortControls/SortControls';
import ProductGrid from "../ProductGrid/ProductGrid";

const Accessoires = () => {
    const [sortedProducts, setSortedProducts] = useState(accessoiresProducts);

    return (
        <section className={styles.accessoires}>
            <div className={styles.header}>
                <h2>Galaxy Accessoires</h2>
            </div>
            <div className="container">
                <div className={styles.sortWrapper}>
                    <div className={styles.sortContainer}>
                        <SortControls
                            products={accessoiresProducts}
                            onSortChange={setSortedProducts}
                        />
                    </div>
                </div>
                <ProductGrid products={sortedProducts} />
            </div>
        </section>
    );
};

export default Accessoires;