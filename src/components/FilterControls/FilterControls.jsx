// FilterControls.jsx
import { useState } from 'react';
import Slider from '../../assets/Slider.svg';
import styles from './FilterControls.module.scss';

const FilterControls = ({
                            products,
                            onFilterChange,
                            isOpen,
                            onOpenChange
                        }) => {
    const [filters, setFilters] = useState({
        priceRange: [0, 200],
        inStock: false
    });

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        const filtered = products.filter(product => {
            const price = parseFloat((product.price_sale || product.price).replace('$', ''));
            const priceMatch = price >= filters.priceRange[0] && price <= filters.priceRange[1];
            const stockMatch = !filters.inStock || price > 0;
            return priceMatch && stockMatch;
        });

        onFilterChange(filtered);
        onOpenChange(false);
    };

    const resetFilters = () => {
        setFilters({
            priceRange: [0, 200],
            inStock: false
        });
        onFilterChange(products);
        onOpenChange(false);
    };

    return (
        <div className={styles.filterContainer}>
            <button
                className={styles.filterButton}
                onClick={() => onOpenChange(!isOpen)}
            >
                <span>Filters</span>
                <Slider className={styles.slider}/>
            </button>

            {isOpen && (
                <div className={styles.filterDropdown}>
                    <div className={styles.filterGroup}>
                        <h4 className={styles.filterGroupTitle}>Price Range</h4>
                        <div className={styles.rangeInputs}>
                            <input
                                type="number"
                                className={styles.rangeInput}
                                value={filters.priceRange[0]}
                                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                                min="0"
                                max={filters.priceRange[1]}
                            />
                            <span className={styles.rangeSeparator}>-</span>
                            <input
                                type="number"
                                className={styles.rangeInput}
                                value={filters.priceRange[1]}
                                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                                min={filters.priceRange[0]}
                                max="200"
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>
                            <input
                                type="checkbox"
                                className={styles.filterCheckbox}
                                checked={filters.inStock}
                                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                            />
                            In Stock Only
                        </label>
                    </div>

                    <div className={styles.filterActions}>
                        <button
                            className={styles.filterApplyButton}
                            onClick={applyFilters}
                        >
                            Apply
                        </button>
                        <button
                            className={styles.filterResetButton}
                            onClick={resetFilters}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterControls;