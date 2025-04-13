import { useState } from 'react';
import styles from './Accessoires.module.scss'
import accessoiresProducts from '../../data/accessoires.json';
import SortControls from '../SortControls/SortControls';
import FilterControls from '../FilterControls/FilterControls';
import ProductGrid from "../ProductGrid/ProductGrid";

const Accessoires = () => {
    const [displayedProducts, setDisplayedProducts] = useState(accessoiresProducts);
    const [sortedProducts, setSortedProducts] = useState(accessoiresProducts);
    const [openControl, setOpenControl] = useState(null); // 'sort' или 'filter'

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
                <ProductGrid products={sortedProducts} />
            </div>
        </section>
    );
};

export default Accessoires;