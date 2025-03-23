import { useState } from 'react';
import Link from 'next/link'
import styles from './Accessoires.module.scss'
import { useCart } from '../../context/CartContext'

const products = [
    {
        id: 1,
        name: 'Galaxy 65W Charger White',
        price: '$49.95',
        tag: 'NEW ARRIVAL',
        image: '/images/galaxy-charger-white.webp',
        link: '/accessoires/charger-white'
    },
    {
        id: 2,
        name: 'Galaxy 65W Charger Yellow',
        price: '$49.95',
        tag: 'NEW ARRIVAL',
        image: '/images/galaxy-charger-yellow.webp',
        link: '/accessoires/charger-yellow'
    },
    {
        id: 3,
        name: 'Galaxy Pro Cyberpunk Keycaps',
        price: '$39.95',
        tag: 'NEW ARRIVAL',
        image: '/images/galaxy-keycaps-cyberpunk.webp',
        link: '/accessoires/keycaps-cyberpunk'
    },
    {
        id: 4,
        name: 'Galaxy Wireless Speaker Black',
        price: '$199.95',
        image: '/images/galaxy-speaker-black.webp',
        link: '/accessoires/galaxy-dongle'
    },
    {
        id: 5,
        name: 'Galaxy Mousepad XL',
        price: '$29.95',
        image: '/images/anime-mousepad.jpg',
        link: '/accessoires/galaxy-mousepad-xl'
    },
    {
        id: 6,
        name: 'Galaxy M1 Pro 4K Wireless Dongle',
        price: '$24.95',
        image: '/images/galaxy-dongle.jpg',
        link: '/accessoires/galaxy-dongle'
    },
    {
        id: 7,
        name: 'Galaxy Keyboard Wrist Rest Pad',
        price_sale: '$9.99',
        price_old: '$12.99',
        discount: 'Save 23%',
        image: '/images/galaxy-wrist-pad.webp',
        link: '/accessoires/wrist-pad'
    },
]

const Accessoires = () => {
    const [sortOption, setSortOption] = useState('id_asc'); // Состояние для выбора сортировки
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для открытия/закрытия dropdown
    const { addToCart } = useCart();

    // Функция для сортировки продуктов
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'id_asc') {
            return a.id - b.id; // Сортировка по id по возрастанию
        } else if (sortOption === 'price_asc') {
            // Сортировка по цене по возрастанию (с учетом price_sale)
            const priceA = parseFloat((a.price_sale || a.price).replace('$', ''));
            const priceB = parseFloat((b.price_sale || b.price).replace('$', ''));
            return priceA - priceB;
        } else if (sortOption === 'price_desc') {
            // Сортировка по цене по убыванию (с учетом price_sale)
            const priceA = parseFloat((a.price_sale || a.price).replace('$', ''));
            const priceB = parseFloat((b.price_sale || b.price).replace('$', ''));
            return priceB - priceA;
        }
        return 0; // По умолчанию (не должно происходить)
    });

    // Функция для выбора сортировки
    const handleSortChange = (option) => {
        setSortOption(option);
        setIsDropdownOpen(false); // Закрываем dropdown после выбора
    };

    // Функция для переключения dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Текст для выбранной опции
    const getSortOptionText = (option) => {
        switch (option) {
            case 'id_asc':
                return 'Sort by Relevance';
            case 'price_asc':
                return 'Sort by Price, low to high';
            case 'price_desc':
                return 'Sort by Price, high to low';
            default:
                return 'Sort by';
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <section className={styles.accessoires}>
            <div className={styles.header}>
                <h2>Galaxy Accessoires</h2>

            </div>
            <div className="container">
                <div className={styles.sortWrapper}>
                    <div className={styles.sortContainer}>
                        <div className={styles.sortControls}>
                            <button className={styles.sortButton} onClick={toggleDropdown}>
                                <span>{getSortOptionText(sortOption)}</span>
                                <div className={`${styles.arrow} ${isDropdownOpen ? styles.rotate : ''}`}>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 9L2 5H10L6 9Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </button>
                            {isDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <div onClick={() => handleSortChange('id_asc')}>
                                        Sort by Relevance
                                    </div>
                                    <div onClick={() => handleSortChange('price_asc')}>
                                        Sort by Price, low to high
                                    </div>
                                    <div onClick={() => handleSortChange('price_desc')}>
                                        Sort by Price, high to low
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.grid}>
                    {sortedProducts.map(product => (
                        <div key={product.id} className={styles.product}>
                            <Link href={product.link} className={styles.imageWrapper}>
                                {product.tag && <span className={styles.tag}>{product.tag}</span>}
                                {product.discount && <span className={styles.discount}>{product.discount}</span>}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                />
                            </Link>
                            <div className={styles.textContent}>
                                <div className={styles.title}>{product.name}</div>
                                <div className={styles.textContentSale}>
                                    {product.price_sale ? (
                                        <>
                                            <p className={styles.price_sale}>{product.price_sale}</p>
                                            <s className={styles.price_old}>{product.price_old}</s>
                                        </>
                                    ) : (
                                        <p className={styles.price}>{product.price}</p>
                                    )}
                                </div>
                                <button
                                    className={styles.addToCartButton}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Accessoires;