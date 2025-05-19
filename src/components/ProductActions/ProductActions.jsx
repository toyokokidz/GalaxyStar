import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductDescription from "../ProductDescription/ProductDescription";

export default function ProductActions({
                                           product,
                                           category = 'keyboard',
                                           showDescription = true,
                                           showQuantity = true
                                       }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, cartItems } = useCart();

    const isInCart = cartItems.some(item => item.id === product.id);

    // Обработчик добавления в корзину
    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price_sale || product.price,
            price_sale: product.price_sale,
            price_old: product.price_old,
            image: product.image,
            quantity: showQuantity ? quantity : 1,
            category
        });
    };

    return (
        <div className={styles.productActions}>
            <div className={styles.priceSection}>
                {product.price_sale ? (
                    <>
                        <span className={styles.priceSale}>{product.price_sale}</span>
                        {product.price_old && (
                            <span className={styles.priceOriginal}>{product.price_old}</span>
                        )}
                    </>
                ) : (
                    <span className={styles.price}>{product.price}</span>
                )}
            </div>

            {showQuantity && (
                <div className={styles.quantitySection}>
                    <label>Quantity:</label>
                    <div className={styles.quantitySelector}>
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className={styles.quantityButton}
                        >
                            −
                        </button>
                        <span className={styles.quantityValue}>{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className={styles.quantityButton}
                        >
                            +
                        </button>
                    </div>
                </div>
            )}

            <button
                className={`${styles.addToCartButton} ${isInCart ? styles.inCart : ''}`}
                onClick={handleAddToCart}
                disabled={isInCart}
            >
                {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <ProductDescription
                product={product}
                showDescription={showDescription}
            />
        </div>
    );
}