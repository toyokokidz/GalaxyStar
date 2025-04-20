import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import keyboardData from '../../data/keyboard.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';

const KeyboardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      const foundKeyboard = keyboardData.find(item => 
        item.id === parseInt(id) || item.link?.endsWith(id)
      );
      
      if (!foundKeyboard) {
        router.push('/404'); 
        return;
      }

      setKeyboard(foundKeyboard);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, router]);

  const isInCart = cartItems.some(item => item.id === parseInt(id));
 
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    if (!keyboard) return;
    
    addToCart({
      id: keyboard.id,
      name: keyboard.name,
      price: keyboard.price_sale || keyboard.price,
      price_sale: keyboard.price_sale,
      price_old: keyboard.price_old,
      image: keyboard.image,
      quantity,
      category: 'keyboard'
    });
  };

  if (loading || !keyboard) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        Loading product...
      </div>
    );
  }

  const renderDescription = () => {
    if (!keyboard.description) {
      return <p className={styles.noDescription}>No description available</p>;
    }

    if (typeof keyboard.description === 'string') {
      return (
        <div className={styles.descriptionContent}>
          <p>{keyboard.description}</p>
        </div>
      );
    }

    return (
      <div className={styles.descriptionContent}>
        {keyboard.description.content?.map((item, index) => {
          switch (item.type) {
            case 'paragraph':
              return <p key={index} className={styles.descriptionText}>{item.text}</p>;
            case 'header':
              return <h3 key={index} className={styles.featureHeader}>{item.text}</h3>;
            case 'feature':
              return (
                <div key={index} className={styles.featureItem}>
                  <span className={styles.featureName}>{item.name}:</span>
                  <span className={styles.featureDetail}>{item.value}</span>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.breadcrumbs}>
        <Link href="/" passHref>
          Home
        </Link> &gt; 
        <Link href="/keyboard" passHref>
          Keyboard
        </Link> &gt; 
        <span>{keyboard.name}</span>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={keyboard.image}
              alt={keyboard.description?.title + ' ' + keyboard.name}
              width={600}
              height={600}
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.productTitle}>
            {keyboard.description?.title}
          </h1>
          
          <div className={styles.priceSection}>
            {keyboard.price_sale ? (
              <>
                <span className={styles.priceSale}>{keyboard.price_sale}</span>
                {keyboard.price_old && (
                  <span className={styles.priceOriginal}>{keyboard.price_old}</span>
                )}
              </>
            ) : (
              <span className={styles.price}>{keyboard.price}</span>
            )}
          </div>
          <div className={styles.quantitySection}>
            <label htmlFor="quantity">Quantity:</label>
            <div className={styles.quantitySelector}>
              <button onClick={handleDecrement} className={styles.quantityButton}>−</button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button onClick={handleIncrement} className={styles.quantityButton}>+</button>
            </div>
          </div>

          <button
            className={`${styles.addToCartButton} ${isInCart ? styles.inCart : ''}`}
            onClick={handleAddToCart}
            disabled={isInCart}
            aria-label={isInCart ? 'Product in cart' : 'Add to cart'}
          >
            {isInCart ? (
              <>
                <span className={styles.checkIcon}>✓</span>
                Added to Cart
              </>
            ) : (
              'Add to Cart'
            )}
          </button>

          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Product Description</h2>
            {renderDescription()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardPage;
