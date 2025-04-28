import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
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
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const flexLinesRef = useRef([]);

  useEffect(() => {
    if (!id) return;

    const foundKeyboard = keyboardData.find(item =>
      item.id === parseInt(id) || item.link?.endsWith(id)
    );

    if (!foundKeyboard) {
      router.push('/404');
      return;
    }

    setKeyboard(foundKeyboard); 
    setLoading(false);
  }, [id, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    flexLinesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      flexLinesRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

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

  const renderDescription = () => {
    if (!keyboard.description) {
      return <p className={styles.noDescription}>No description available</p>;
    }

    if (typeof keyboard.description === 'object' && keyboard.description.title && keyboard.description.content) {
      return (
        <div className={styles.descriptionContent}>
          <h3>{keyboard.description.title}</h3>
          <div>
            {keyboard.description.content.map((item, index) => {
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
        </div>
      );
    }

    if (typeof keyboard.description === 'string') {
      return (
        <div className={styles.descriptionContent}>
          <p>{keyboard.description}</p>
        </div>
      );
    }

    return null;
  };

  if (loading || !keyboard) { 
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        Loading product...
      </div>
    );
  }

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.breadcrumbs}>
        <Link href="/" passHref>
          Home/
        </Link>
        <Link href="/keyboard" passHref>
          Keyboard/
        </Link>
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
            {keyboard.title || keyboard.name}
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
            <button onClick={() => setDescriptionVisible(prev => !prev)} className={styles.toggleButton}>
              {isDescriptionVisible ? 'Hide Description' : 'Description'}
            </button>
            {isDescriptionVisible && renderDescription()}
          </div>
        </div>
      </div>
      {keyboard.id === 1 && (
        <div className={styles.container2}>
          <div className={styles.heading}>
            <span>Mercury K1 Pro - Galaxy Black</span>
            <h2>Feel the Aluminum Flow</h2>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h3>Design From Outside</h3>
                <p>The Mercury K1 Pro is forged from a strong yet lightweight aluminum alloy for the perfect balance of durability and portability. The branching skeletal frame supports and stabilizes each keystroke with an elegant symmetry that almost feels alive, as though it's still in motion, constantly reforging itself. Evolving. You'd better keep a close eye on this one. </p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-keyboard-pro1.jpg" 
                  alt="Mercury K1 Pro" 
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-keyboard-pro2.webp" 
                  alt="Mercury K1 Pro" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>Merge with the Machine</h3>
                <p>Metal flows up and around the keys, wrapping them in quicksilver branches that flicker and shift against a brilliant aura of power. Two adjustable GravaStar stabilizers anchor the K1 Pro to this plane of reality, locking its energy into a stable matrix. Row after row of custom Kailh Linear switches wait in perfect silence for new commands - the only piece missing is you. </p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h3>Strike from the Silence</h3>
                <p>Harness the K1 Pro's two integrated RGB lighting systems, offering a choice of 16.8 million colors. The south-facing key backlights provide 13 different lighting modes, with custom options for lighting speed, brightness, and color changes.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-keyboard-pro3.webp" 
                  alt="Mercury K1 Pro" 
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[3] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-keyboard-pro4.webp" 
                  alt="Mercury K1 Pro" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>A Brilliant Aura of Power </h3>
                <p>The K1 Pro features a custom set of GalaxyStar x Kailh linear switches for stealthy keystrokes. Give you the fastest reactions with a quick rebound for rapid input. Durable POK stems produce a clean, crisp sound with a smooth key feel that gets even smoother over time—no lubing required. Rated at 70,000,000 keystrokes for years even heavy use, these custom linears are the perfect gaming advantage. </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyboardPage;
