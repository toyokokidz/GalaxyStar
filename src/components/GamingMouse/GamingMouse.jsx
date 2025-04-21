import { useState } from 'react';
import styles from './GamingMouse.module.scss';
import mouseProducts from '../../data/mouse.json';
import SortControls from "../SortControls/SortControls";
import FilterControls from "../FilterControls/FilterControls";
import ProductGrid from "../ProductGrid/ProductGrid";

const GamingMouse = () => {
    const [displayedProducts, setDisplayedProducts] = useState(mouseProducts);
    const [sortedProducts, setSortedProducts] = useState(mouseProducts);
    const [openControl, setOpenControl] = useState(null);

    const handleFilterChange = (filteredProducts) => {
        setDisplayedProducts(filteredProducts);
        setSortedProducts(filteredProducts);
    };

    return (
        <section className={styles.gamingmouse}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Mouse</h2>
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
                            products={mouseProducts}
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
                                setDisplayedProducts(mouseProducts);
                                setSortedProducts(mouseProducts);
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

export default GamingMouse;