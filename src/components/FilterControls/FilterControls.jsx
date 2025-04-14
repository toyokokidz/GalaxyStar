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
        inStock: false,
        productType: ''
    });

    const productTypes = [...new Set(products.map(product => {
        if (product.name.includes('Charger')) return 'Charger';
        if (product.name.includes('Keycaps')) return 'Keycaps';
        if (product.name.includes('Speaker')) return 'Speaker';
        if (product.name.includes('Mousepad')) return 'Mousepad';
        if (product.name.includes('Dongle')) return 'Dongle';
        if (product.name.includes('Wrist Rest')) return 'Wrist Rest';
        return 'Other';
    }))];

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
            const stockMatch = !filters.inStock || parseFloat(price) > 0;

            let typeMatch = true;
            if (filters.productType) {
                if (filters.productType === 'Charger') typeMatch = product.name.includes('Charger');
                else if (filters.productType === 'Keycaps') typeMatch = product.name.includes('Keycaps');
                else if (filters.productType === 'Speaker') typeMatch = product.name.includes('Speaker');
                else if (filters.productType === 'Mousepad') typeMatch = product.name.includes('Mousepad');
                else if (filters.productType === 'Dongle') typeMatch = product.name.includes('Dongle');
                else if (filters.productType === 'Wrist Rest') typeMatch = product.name.includes('Wrist Rest');
            }

            return priceMatch && stockMatch && typeMatch;
        });

        onFilterChange(filtered);
        onOpenChange(false);
    };

    const resetFilters = () => {
        setFilters({
            priceRange: [0, 200],
            inStock: false,
            productType: ''
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

                    <div className={styles.filterGroup}>
                        <h4 className={styles.filterGroupTitle}>Product Type</h4>
                        <select
                            className={styles.filterSelect}
                            value={filters.productType}
                            onChange={(e) => handleFilterChange('productType', e.target.value)}
                        >
                            <option value="">All Types</option>
                            {productTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
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
