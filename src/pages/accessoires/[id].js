import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
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
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const flexLinesRef = useRef([]);

  useEffect(() => {
    if (!id) return;

    const foundAccessory = accessoriesData.find(item =>
      item.id === parseInt(id) || item.link?.endsWith(id)
    );

    if (!foundAccessory) {
      router.push('/404');
      return;
    }

    setAccessory(foundAccessory);
    setLoading(false);
  }, [id, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
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

  const renderDescription = () => {
    if (!accessory.description) {
      return <p className={styles.noDescription}>No description available</p>;
    }

    if (typeof accessory.description === 'object' && accessory.description.title && accessory.description.content) {
      return (
        <div className={styles.descriptionContent}>
          <h3>{accessory.description.title}</h3>
          <div>
            {accessory.description.content.map((item, index) => {
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

    if (typeof accessory.description === 'string') {
      return (
        <div className={styles.descriptionContent}>
          <p>{accessory.description}</p>
        </div>
      );
    }

    return null;
  };

  if (loading || !accessory) {
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
        <Link href="/accessoires" passHref>
          Accessories/
        </Link> 
        <span>{accessory.name}</span>
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
            {accessory.title || accessory.name}
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
            <button onClick={() => setDescriptionVisible(prev => !prev)} className={styles.toggleButton}>
              {isDescriptionVisible ? 'Hide Description' : 'Description'}
            </button>
            {isDescriptionVisible && renderDescription()}
          </div>
        </div>
      </div>

      {accessory.id === 1 && (
        <div className={styles.container2}>
          <div className={styles.heading}>
            <span>Alpha65 65W GaN Fast Charger</span>
            <h2>Transform Your Charging Experience</h2>
            <p className={styles.headingName}>
              Alpha 65W GaN Fast Wall Charger, your one-stop solution for efficient and versatile charging. 
              This product combines powerful GaN technology with a fun, transformable design, ideal for charging multiple devices at once.
            </p>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h3>65 Watts Maximum Charging Output</h3>
                <p>Charge all your devices at futuristic speeds with 65 watts of USB power delivery. Replace all your old chargers with a single, high-efficiency Alpha65 fast charger that powers everything from laptops to smartphones and drones.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-white1.webp" 
                  alt="Alpha65 Charger" 
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-white2.webp" 
                  alt="Alpha65 USB Ports" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>3 USB Ports</h3>
                <p>With Alpha65's three USB ports, you can power through all your charging tasks at once. Two USB Type-C PD ports and one USB Type-A port deliver the fastest charge your devices can handle.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h3>GaN Fast Charging</h3>
                <p>High-efficiency gallium nitride transistors are smaller and faster than the silicon transistors used in other chargers. GaN construction keeps the Alpha65 cool at all times, even when it's carrying a full 65-watt power load.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-white3.webp" 
                  alt="Alpha65 GaN Tech" 
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {accessory.id === 2 && (
        <div className={styles.container2}>
          <div className={styles.heading}>
            <span>Alpha65 65W GaN Fast Charger</span>
            <h2>Transform Your Charging Experience</h2>
            <p className={styles.headingName}>
              Alpha 65W GaN Fast Wall Charger, your one-stop solution for efficient and versatile charging. 
              This product combines powerful GaN technology with a fun, transformable design, ideal for charging multiple devices at once.
            </p>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h3>GaN Fast Charging</h3>
                <p>High-efficiency gallium nitride transistors are smaller and faster than the silicon transistors used in other chargers. GaN construction keeps the Alpha65 cool at all times, even when it's carrying a full 65-watt power load.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-yellow1.webp" 
                  alt="Alpha65 Charger" 
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-yellow2.webp" 
                  alt="Alpha65 USB Ports" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>Mecha Protection Mode: Enabled</h3>
                <p>Your Alpha65 wants to keep your devices safe! It features 8 different built-in protections against overvoltage, overcurrent, short-circuiting, overheating, overpower, low voltage, electrostatic discharge, and interference. The mecha shell is molded from heat-resistant PVC for your protection.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h3>Futuristic Flexibility</h3>
                <p>The Alpha65 can recharge any device with a USB power supply, whether it has the latest fast charging tech or just basic USB power. It is compatible with 110V-240V input sources and is available with a US or EU/UK plug.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-yellow3.webp" 
                  alt="Alpha65 GaN Tech" 
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {accessory.id === 2 && (
        <div className={styles.container2}>
          <div className={styles.heading}>
            <span>Alpha65 65W GaN Fast Charger</span>
            <h2>Transform Your Charging Experience</h2>
            <p className={styles.headingName}>
              Alpha 65W GaN Fast Wall Charger, your one-stop solution for efficient and versatile charging. 
              This product combines powerful GaN technology with a fun, transformable design, ideal for charging multiple devices at once.
            </p>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h3>GaN Fast Charging</h3>
                <p>High-efficiency gallium nitride transistors are smaller and faster than the silicon transistors used in other chargers. GaN construction keeps the Alpha65 cool at all times, even when it's carrying a full 65-watt power load.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-yellow1.webp" 
                  alt="Alpha65 Charger" 
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-yellow2.webp" 
                  alt="Alpha65 USB Ports" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>Mecha Protection Mode: Enabled</h3>
                <p>Your Alpha65 wants to keep your devices safe! It features 8 different built-in protections against overvoltage, overcurrent, short-circuiting, overheating, overpower, low voltage, electrostatic discharge, and interference. The mecha shell is molded from heat-resistant PVC for your protection.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h3>Futuristic Flexibility</h3>
                <p>The Alpha65 can recharge any device with a USB power supply, whether it has the latest fast charging tech or just basic USB power. It is compatible with 110V-240V input sources and is available with a US or EU/UK plug.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-charger-yellow3.webp" 
                  alt="Alpha65 GaN Tech" 
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {accessory.id === 4 && (
        <div className={styles.container2}>
          <div className={styles.heading}>
            <span>Mars Pro Bluetooth Speaker</span>
            <h2>Sound Meets Sci-Fi</h2>
            <p className={styles.headingName}>The Mars Pro is more than just the perfect speaker for audiophiles—its futuristic mecha design catches the eye while the speaker core impresses your ear. Three foldable legs lift the tough zinc alloy shell into the air for pristine sound without any distortion from surface contact.</p>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h3>20 Watt Dual Speaker System</h3>
                <p>Twin speakers beat at the heart of the Mars Pro, pumping out 20 watts of powerful, richly textured sound that will fill any room and satisfy any listener.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-speaker-black1.webp" 
                  alt="Mars Pro Bluetooth Speaker" 
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-speaker-black2.webp" 
                  alt="Mars Pro Bluetooth Speaker" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>Passive Bass Radiator</h3>
                <p>The Mars Pro speaker design includes a passive bass radiator to generate maximum bass from a small footprint, so your space stays clear and your lows stay loud.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h3>Dynamic RGB Lighting</h3>
                <p>Match the vibe to your sonic style with the Mars Pro's customizable RGB lighting system. Choose one of six solid or pulsing colors for a consistent look, or switch things up with the dynamic music mode that shifts in time to the beat.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-speaker-black1.webp" 
                  alt="Mars Pro Bluetooth Speaker" 
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      )}
            {accessory.id === 7 && (
        <div className={styles.container2}>
          <div className={styles.flexContainer}>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
              <div className={styles.flexItem}>
                <h3>Premium Build Quality</h3>
                <p>Constructed with a durable ABS plastic base and a PU leather surface, this wrist rest offers a perfect blend of sturdiness and comfort, ensuring long-lasting performance with a luxurious feel.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-wrist-pad1.webp" 
                  alt="Keyboard Wrist Rest Pad" 
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
            <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-wrist-pad2.webp" 
                  alt="Keyboard Wrist Rest Pad" 
                  className={styles.image}
                />
              </div>
              <div className={styles.flexItem}>
                <h3>Ergonomic Support</h3>
                <p>Designed with ergonomics in mind, the wrist rest promotes natural wrist alignment, reducing strain during extended use. Its compact dimensions (32.5 x 72 mm) and lightweight design (153 g) make it an ideal accessory for both desktop and portable setups.</p>
              </div>
            </div>
            <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
              <div className={styles.flexItem}>
                <h3>Stable and Stylish</h3>
                <p>The non-slip base guarantees stability, keeping the wrist rest securely in place on any surface. Its minimalist and elegant design adds a touch of sophistication to your workspace, and it's easy to maintain, thanks to the easy-to-clean materials.</p>
              </div>
              <div className={styles.flexItem}>
                <img 
                  src="/images/galaxy-wrist-pad1.webp" 
                  alt="Keyboard Wrist Rest Pad" 
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoryPage;