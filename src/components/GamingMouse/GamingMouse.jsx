import { useState } from 'react';
import styles from './GamingMouse.module.scss';
import mouseProducts from '../../data/mouse.json';
import SortControls from "../SortControls/SortControls";
import ProductGrid from "../ProductGrid/ProductGrid";

const GamingMouse = () => {
    const [sortedProducts, setSortedProducts] = useState(mouseProducts);

    return (
        <section className={styles.gamingmouse}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Mouse</h2>
            </div>
            <div className="container">
                <div className={styles.sortWrapper}>
                    <div className={styles.sortContainer}>
                        <SortControls
                            products={mouseProducts}
                            onSortChange={setSortedProducts}
                        />
                    </div>
                </div>
                <ProductGrid products={sortedProducts} />
            </div>
        </section>
    );
};

export default GamingMouse;