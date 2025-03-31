import { useState } from 'react';
import Link from 'next/link'
import styles from './Accessoires.module.scss'
import SortControls from '../SortControls/SortControls';
import {useCart} from "../../context/CartContext";


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
    const [sortedProducts, setSortedProducts] = useState(products);
    const { addToCart } = useCart();

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

export default Accessoires;