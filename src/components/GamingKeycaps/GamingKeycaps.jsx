import { useState } from 'react';
import Link from 'next/link'
import styles from './GamingKeycaps.module.scss'
import { useCart } from '../../context/CartContext'

const products = [
    {
        id: 1,
        name: 'Galaxy PBT Keycaps - Cosmic Black',
        price: '$49.99',
        image: '/images/keycaps-cosmic-black.jpg',
        tag: 'NEW ARRIVAL',
        link: '/keycaps/cosmic-black'
    },
    {
        id: 2,
        name: 'Galaxy PBT Keycaps - Nebula Purple',
        price: '$59.95',
        image: '/images/keycaps-nebula-purple.jpg',
        tag: 'NEW ARRIVAL',
        link: '/keycaps/nebula-purple'
    },
    {
        id: 3,
        name: 'Galaxy PBT Keycaps - Aurora Green',
        price: '$54.95',
        image: '/images/keycaps-aurora-green.jpg',
        tag: 'NEW ARRIVAL',
        link: '/keycaps/aurora-green'
    },
    {
        id: 4,
        name: 'Galaxy PBT Keycaps - Solar Gold',
        price_sale: '$44.95',
        price_old: '$54.95',
        discount: 'Save 18%',
        image: '/images/keycaps-solar-gold.jpg',
        link: '/keycaps/solar-gold'
    }
]

const GamingKeycaps = () => {
    const [sortOption, setSortOption] = useState('id_asc');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { addToCart } = useCart();

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'id_asc') {
            return a.id - b.id;
        } else if (sortOption === 'price_asc') {
            const priceA = parseFloat((a.price_sale || a.price).replace('$', ''));
            const priceB = parseFloat((b.price_sale || b.price).replace('$', ''));
            return priceA - priceB;
        } else if (sortOption === 'price_desc') {
            const priceA = parseFloat((a.price_sale || a.price).replace('$', ''));
            const priceB = parseFloat((b.price_sale || b.price).replace('$', ''));
            return priceB - priceA;
        }
        return 0;
    });

    const handleSortChange = (option) => {
        setSortOption(option);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
        <section className={styles.gamingkeycaps}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Keycaps</h2>
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
            </div>
            <div className="container">
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

export default GamingKeycaps; 