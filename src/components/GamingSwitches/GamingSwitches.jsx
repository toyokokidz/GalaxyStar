import React from 'react';
import { useState } from 'react';
import Link from 'next/link'
import styles from './GamingSwitches.module.scss'
import { useCart } from '../../context/CartContext.jsx'

const products = [
    {
        id: 1,
        name: 'Galaxy Linear Switches - Red',
        price: '$39.99',
        image: '/images/galaxy-mouse-smist.jpg',
        tag: 'NEW ARRIVAL',
        link: '/switches/switches-red'
    },
    {
        id: 2,
        name: 'Galaxy Tactile Switches - Brown',
        price: '$44.95',
        image: '/images/galaxy-dongle.jpg',
        tag: 'NEW ARRIVAL',
        link: '/switches/switches-brown'
    },
    {
        id: 3,
        name: 'Galaxy Silent Linear Switches',
        price: '$49.95',
        image: '/images/galaxy-mouse-black.jpg',
        tag: 'NEW ARRIVAL',
        link: '/switches/switches-silent'
    },
    {
        id: 4,
        name: 'Galaxy Clicky Switches - Blue',
        price_sale: '$34.95',
        price_old: '$44.95',
        discount: 'Save 22%',
        image: '/images/galaxy-mouse-xpro.jpg',
        link: '/switches/switches-blue'
    }
]

const GamingSwitches = () => {
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
        <section className={styles.gamingswitches}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Switches</h2>
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

export default GamingSwitches; 