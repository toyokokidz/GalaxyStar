import { useState } from 'react';
import Link from 'next/link'
import styles from './GamingKeyboard.module.scss'
import SortControls from "../SortControls/SortControls";
import { useCart } from '../../context/CartContext'

const products = [
    {
        id: 1,
        name: 'Galaxy Pro Mechanical Keyboard Black',
        price: '$199.95',
        image: '/images/galaxy-keyboard-pro.webp',
        tag: 'NEW ARRIVAL',
        link: '/keyboard/pro-mechanical-black'
    },
    {
        id: 2,
        name: 'Galaxy Pro Mechanical Keyboard Yellow',
        price: '$199.95',
        tag: 'NEW ARRIVAL',
        image: '/images/galaxy-keyboard-yellow.webp',
        link: '/keyboard/pro-mechanical-yellow'
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
        name: 'Galaxy Mechanical Keyboard Black',
        price: '$159.99',
        image: '/images/galaxy-keyboard-black.webp',
        link: '/keyboard/mechanical-black'
    },
    {
        id: 5,
        name: 'Galaxy Mechanical Keyboard White',
        price_sale: '$139.99',
        price_old: '$159.99',
        discount: 'Save 12%',
        image: '/images/galaxy-keyboard-white.webp',
        link: '/keyboard/mechanical-white'
    },
    {
        id: 6,
        name: 'Galaxy Keyboard Wrist Rest Pad',
        price_sale: '$9.99',
        price_old: '$12.99',
        discount: 'Save 23%',
        image: '/images/galaxy-wrist-pad.webp',
        link: '/accessoires/wrist-pad'
    }
]

const GamingKeyboard = () => {
    const [sortedProducts, setSortedProducts] = useState(products);
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <section className={styles.gamingkeyboard}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Keyboard</h2>
            </div>
            <div className="container">
                <div className={styles.sortWrapper}>
                    <div className={styles.sortContainer}>
                        <SortControls
                            products={products}
                            onSortChange={setSortedProducts}
                        />
                    </div>
                </div>
                <div className={styles.grid}>
                    {sortedProducts.map((product) => (
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

export default GamingKeyboard; 