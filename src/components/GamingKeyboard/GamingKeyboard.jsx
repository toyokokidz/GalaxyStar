import { useState } from 'react';
import styles from './GamingKeyboard.module.scss';
import keyboardProducts from '../../data/keyboard.json';
import SortControls from "../SortControls/SortControls";
import ProductGrid from "../ProductGrid/ProductGrid";

const GamingKeyboard = () => {
    const [sortedProducts, setSortedProducts] = useState(keyboardProducts);

    return (
        <section className={styles.gamingkeyboard}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Keyboard</h2>
            </div>
            <div className="container">
                <div className={styles.sortWrapper}>
                    <div className={styles.sortContainer}>
                        <SortControls
                            products={keyboardProducts}
                            onSortChange={setSortedProducts}
                        />
                    </div>
                </div>
                <ProductGrid products={sortedProducts} />
            </div>
        </section>
    );
};

export default GamingKeyboard;