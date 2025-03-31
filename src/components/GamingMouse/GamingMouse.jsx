import { useState } from 'react';
import Link from 'next/link'
import styles from './GamingMouse.module.scss'
import SortControls from "../SortControls/SortControls";
import {useCart} from "../../context/CartContext";

const products = [
    {
        id: 1,
        name: 'Galaxy Mouse Black',
        price: '$89.99',
        image: '/images/galaxy-mouse-black.jpg',
        tag: 'NEW ARRIVAL',
        link: '/mouse/galaxy-mouse-black'
    },
    {
        id: 2,
        name: 'Galaxy X Pro 8K Wireless Gaming Mouse',
        price: '$139.95',
        image: '/images/galaxy-mouse-xpro.jpg',
        tag: 'NEW ARRIVAL',
        link: '/mouse/galaxy-mouse-xpro'
    },
    {
        id: 3,
        name: 'Galaxy X Wireless Gaming Mouse',
        price: '$109.95',
        image: '/images/galaxy-mouse-x.jpg',
        tag: 'NEW ARRIVAL',
        link: '/mouse/galaxy-mouse-x'
    },
    {
        id: 4,
        name: 'Galaxy Mouse Yellow',
        price: '$89.99',
        image: '/images/galaxy-mouse-yellow.jpg',
        tag: 'NEW ARRIVAL',
        link: '/mouse/galaxy-mouse-yellow'
    },
    {
        id: 5,
        name: 'Galaxy M1 Pro Gunmetal Gray',
        price: '$99.95',
        image: '/images/galaxy-mouse-gunmetal.jpg',
        link: '/mouse/galaxy-mouse-gunmetal'
    },
    {
        id: 6,
        name: 'Galaxy M1 Pro Gradient Black',
        price: '$99.95',
        image: '/images/galaxy-mouse-gradient.jpg',
        link: '/mouse/galaxy-mouse-gradient'
    },
    {
        id: 7,
        name: 'Galaxy M2 - Stealth Black',
        price_sale: '$69.95',
        price_old: '$79.95',
        discount: 'Save 13%',
        image: '/images/galaxy-mouse-stealth.jpg',
        link: '/mouse/galaxy-mouse-stealth'
    },
    {
        id: 8,
        name: 'Galaxy M2 - Transparent Black',
        price_sale: '$69.95',
        price_old: '$79.95',
        discount: 'Save 13%',
        image: '/images/galaxy-mouse-transparent.jpg',
        link: '/mouse/galaxy-mouse-transparent'
    },
    {
        id: 9,
        name: 'Galaxy M1 Pro Battle Worn Edition-Silver Mist',
        price_sale: '$99.95',
        price_old: '$129.95',
        discount: 'Save 23%',
        image: '/images/galaxy-mouse-smist.jpg',
        link: '/mouse/galaxy-mouse-smist'
    },
    {
        id: 10,
        name: 'Galaxy M1 Pro 4K Wireless Dongle',
        price: '$24.95',
        image: '/images/galaxy-dongle.jpg',
        link: '/accessoires/galaxy-dongle'
    }
]

const GamingMouse = () => {
    const [sortedProducts, setSortedProducts] = useState(products);
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <section className={styles.gamingmouse}>
            <div className={styles.header}>
                <h2>Galaxy Gaming Mouse</h2>
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

export default GamingMouse;