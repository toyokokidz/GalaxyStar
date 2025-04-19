// Accessoires.jsx
import { useState } from 'react';
import styles from './Accessoires.module.scss';
import accessoiresProducts from '../../data/accessoires.json';
import SortControls from '../SortControls/SortControls';
import FilterControls from '../FilterControls/FilterControls';
import ProductGrid from "../ProductGrid/ProductGrid";
import keyboardProducts from "../../data/keyboard.json";

const Accessoires = () => {
    const [displayedProducts, setDisplayedProducts] = useState(accessoiresProducts);
    const [sortedProducts, setSortedProducts] = useState(accessoiresProducts);
    const [openControl, setOpenControl] = useState(null);

    const handleFilterChange = (filteredProducts) => {
        setDisplayedProducts(filteredProducts);
        setSortedProducts(filteredProducts);
    };

    return (
        <section className={styles.accessoires}>
            <div className={styles.header}>
                <h2>Galaxy Accessoires</h2>
            </div>
            <div className="container">
                <div className={styles.sortWrapper}>
                    <div className={styles.sortContainer}>
                        <SortControls
                            products={displayedProducts}
                            onSortChange={setSortedProducts}
                            isOpen={openControl === 'sort'}
                            onOpenChange={(isOpen) => setOpenControl(isOpen ? 'sort' : null)}
                        />
                        <FilterControls
                            products={accessoiresProducts}
                            onFilterChange={handleFilterChange}
                            isOpen={openControl === 'filter'}
                            onOpenChange={(isOpen) => setOpenControl(isOpen ? 'filter' : null)}
                        />
                    </div>
                </div>
                {sortedProducts.length > 0 ? (
                    <ProductGrid products={sortedProducts} />
                ) : (
                    <div className={styles.noProducts}>
                        <h3>No products found</h3>
                        <p>Try adjusting your filters to find what you're looking for.</p>
                        <button
                            className={styles.resetButton}
                            onClick={() => {
                                setDisplayedProducts(keyboardProducts);
                                setSortedProducts(keyboardProducts);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Accessoires;