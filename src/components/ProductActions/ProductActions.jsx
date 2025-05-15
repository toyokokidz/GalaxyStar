import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from '../../components/Accessoires/Accessoires.module.scss';

export default function ProductActions({
                                           product,
                                           category = 'keyboard',
                                           showDescription = true,
                                           showQuantity = true
                                       }) {
    const [quantity, setQuantity] = useState(1);
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
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

    // Рендер описания
    const renderDescription = () => {
        if (!product.description) return null;

        if (typeof product.description === 'string') {
            return <p>{product.description}</p>;
        }

        return (
            <div className={styles.descriptionContent}>
                {product.description.content?.map((item, index) => (
                    <div key={index}>
                        {item.type === 'header' && <h3 className={styles.featureHeader}>{item.text}</h3>}
                        {item.type === 'feature' && (
                            <div className={styles.featureItem}>
                                <span className={styles.featureName}>{item.name}:</span>
                                <span>{item.value}</span>
                            </div>
                        )}
                        {item.type === 'paragraph' && <p className={styles.descriptionText}>{item.text}</p>}
                    </div>
                ))}
            </div>
        );
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

            {showDescription && product.description && (
                <div className={styles.descriptionSection}>
                    <button
                        onClick={() => setDescriptionVisible(!isDescriptionVisible)}
                        className={styles.toggleButton}
                    >
                        {isDescriptionVisible ? 'Hide Description' : 'Show Description'}
                    </button>
                    {isDescriptionVisible && renderDescription()}
                </div>
            )}
        </div>
    );
}