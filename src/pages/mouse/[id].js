import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import mouseData from '../../data/mouse.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';

const MousePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [mouse, setMouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, cartItems } = useCart();
    const [quantity, setQuantity] = useState(1);
  
    useEffect(() => {
      if (!id) return;
  
      const timer = setTimeout(() => {
        const foundMouse = mouseData.find(item => 
          item.id === parseInt(id) || item.link?.endsWith(id)
        );
        
        if (!foundMouse) {
          router.push('/404'); 
          return;
        }
  
        setMouse(foundMouse);
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
      if (!mouse) return;
      
      addToCart({
        id: mouse.id,
        name: mouse.name,
        price: mouse.price_sale || mouse.price,
        price_sale: mouse.price_sale,
        price_old: mouse.price_old,
        image: mouse.image,
        quantity,
        category: 'mouse'
      });
    };
  
    if (loading || !mouse) {
      return (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          Loading product...
        </div>
      );
    }
  
    const renderDescription = () => {
      if (!mouse.description) {
        return <p className={styles.noDescription}>No description available</p>;
      }
  
      if (typeof mouse.description === 'string') {
        return (
          <div className={styles.descriptionContent}>
            <p>{mouse.description}</p>
          </div>
        );
      }
  
      return (
        <div className={styles.descriptionContent}>
          {mouse.description.content?.map((item, index) => {
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
          <Link href="/mouse" passHref>
            Mouse
          </Link> &gt; 
          <span>{mouse.name}</span>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={mouse.image}
                alt={mouse.description?.title + ' ' + mouse.name}
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
                {mouse.title || mouse.name}
            </h1>
            
            <div className={styles.priceSection}>
              {mouse.price_sale ? (
                <>
                  <span className={styles.priceSale}>{mouse.price_sale}</span>
                  {mouse.price_old && (
                    <span className={styles.priceOriginal}>{mouse.price_old}</span>
                  )}
                </>
              ) : (
                <span className={styles.price}>{mouse.price}</span>
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
  
  export default MousePage;
  