import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import accessoriesData from '../../data/accessoires.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';

const AccessoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      const foundAccessory = accessoriesData.find(item => 
        item.id === parseInt(id) || item.link?.endsWith(id)
      );
      
      if (!foundAccessory) {
        router.push('/404'); 
        return;
      }

      setAccessory(foundAccessory);
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
    if (!accessory) return;
    
    addToCart({
      id: accessory.id,
      name: accessory.name,
      price: accessory.price_sale || accessory.price,
      price_sale: accessory.price_sale,
      price_old: accessory.price_old,
      image: accessory.image,
      quantity,
      category: 'accessories'
    });
  };

  if (loading || !accessory) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        Loading product...
      </div>
    );
  }

  const renderDescription = () => {
    if (!accessory.description) {
      return <p className={styles.noDescription}>No description available</p>;
    }

    if (typeof accessory.description === 'string') {
      return (
        <div className={styles.descriptionContent}>
          <p>{accessory.description}</p>
        </div>
      );
    }

    return (
      <div className={styles.descriptionContent}>
        {accessory.description.content?.map((item, index) => {
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
        <Link href="/accessoires" passHref>
          Accessories
        </Link> &gt; 
        <span>{accessory.description?.title + ' ' + accessory.name}</span>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={accessory.image}
              alt={accessory.description?.title + ' ' + accessory.name}
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
            {accessory.description?.title + ' ' + accessory.name}
          </h1>
          
          <div className={styles.priceSection}>
            {accessory.price_sale ? (
              <>
                <span className={styles.priceSale}>{accessory.price_sale}</span>
                {accessory.price_old && (
                  <span className={styles.priceOriginal}>{accessory.price_old}</span>
                )}
              </>
            ) : (
              <span className={styles.price}>{accessory.price}</span>
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

export default AccessoryPage;
