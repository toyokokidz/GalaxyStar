import { useState } from 'react';
import Arrow from '../../assets/Arrow.svg';
import styles from './SortControls.module.scss';

const SortControls = ({
                          products,
                          onSortChange,
                          sortOptions = [
                              { value: 'id_asc', label: 'Sort by Relevance' },
                              { value: 'price_asc', label: 'Sort by Price, low to high' },
                              { value: 'price_desc', label: 'Sort by Price, high to low' },
                          ],
                          defaultSort = 'id_asc',
                      }) => {
    const [sortOption, setSortOption] = useState(defaultSort);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSortChange = (option) => {
        setSortOption(option);
        setIsDropdownOpen(false);

        const sortedProducts = [...products].sort((a, b) => {
            if (option === 'id_asc') return a.id - b.id;
            else if (option === 'price_asc') {
                const priceA = parseFloat((a.price_sale || a.price).replace('$', ''));
                const priceB = parseFloat((b.price_sale || b.price).replace('$', ''));
                return priceA - priceB;
            } else if (option === 'price_desc') {
                const priceA = parseFloat((a.price_sale || a.price).replace('$', ''));
                const priceB = parseFloat((b.price_sale || b.price).replace('$', ''));
                return priceB - priceA;
            }
            return 0;
        });

        onSortChange(sortedProducts); // Возвращаем отсортированные данные
    };

    const getCurrentLabel = () => {
        return sortOptions.find((opt) => opt.value === sortOption)?.label || 'Sort by';
    };

    return (
        <div className={styles.sortContainer}>
            <div className={styles.sortControls}>
                <button
                    className={styles.sortButton}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span>{getCurrentLabel()}</span>
                    <Arrow className={`${styles.arrow} ${isDropdownOpen ? styles.rotate : ''}`} />
                </button>
                {isDropdownOpen && (
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