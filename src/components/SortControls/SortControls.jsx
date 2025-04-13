import { useState } from 'react'; // Добавьте этот импорт
import Arrow from '../../assets/Arrow.svg';
import styles from './SortControls.module.scss';

const SORT_VALUES = {
    RELEVANCE: 'relevance',
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
};

const DEFAULT_SORT_OPTIONS = [
    { value: SORT_VALUES.RELEVANCE, label: 'Sort by Relevance' },
    { value: SORT_VALUES.PRICE_ASC, label: 'Sort by Price, low to high' },
    { value: SORT_VALUES.PRICE_DESC, label: 'Sort by Price, high to low' },
];

const getPriceValue = (product) => {
    return parseFloat((product.price_sale || product.price).replace('$', ''));
};

const SortControls = ({
                          products,
                          onSortChange,
                          sortOptions = DEFAULT_SORT_OPTIONS,
                          defaultSort = SORT_VALUES.RELEVANCE,
                          isOpen,
                          onOpenChange,
                      }) => {
    const [sortOption, setSortOption] = useState(defaultSort);

    const handleSortChange = (option) => {
        setSortOption(option);
        onOpenChange(false);

        const sortedProducts = [...products].sort((a, b) => {
            if (option === SORT_VALUES.RELEVANCE) return a.id - b.id;

            const priceA = getPriceValue(a);
            const priceB = getPriceValue(b);

            if (option === SORT_VALUES.PRICE_ASC) return priceA - priceB;
            else if (option === SORT_VALUES.PRICE_DESC) return priceB - priceA;

            return 0;
        });

        onSortChange(sortedProducts);
    };

    const getCurrentLabel = () => {
        return sortOptions.find((opt) => opt.value === sortOption)?.label || 'Sort by';
    };

    return (
        <div className={styles.sortContainer}>
            <div className={styles.sortControls}>
                <button
                    className={styles.sortButton}
                    onClick={() => onOpenChange(!isOpen)}
                >
                    <span>{getCurrentLabel()}</span>
                    <Arrow className={`${styles.arrow} ${isOpen ? styles.rotate : ''}`} />
                </button>
                {isOpen && (
                    <div className={styles.dropdown}>
                        {sortOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSortChange(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortControls;