import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import keyboardData from '../../data/keyboard.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductActions from '../../components/ProductActions/ProductActions';

const KeyboardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading || !keyboard) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        Loading product...
      </div>
    );
  }

  const renderExtraContent = () => {
    switch (keyboard.id) {
      case 1:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury K1 Pro - Galaxy Black</span>
              <h2>Feel the Aluminum Flow</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Design From Outside</h3>
                  <p>The Mercury K1 Pro is forged from a strong yet lightweight aluminum alloy for the perfect balance of durability and portability.</p>
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
                  <p>Metal flows up and around the keys, wrapping them in quicksilver branches that flicker and shift against a brilliant aura of power.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury K1 Pro Special Edition Battle</span>
              <h2>Lightweight Aluminum Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>One-of-a-Kind: Uniquely Yours</h3>
                  <p>Our hand-painted process embraces the beauty of imperfections, making each product truly unique. The subtle variations in strokes and tones infuse each piece with its own distinct personality, ensuring that every K1 Pro Battle-Worn Yellow is one-of-a-kind in the world.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-keyboard-yellow1.webp"
                    alt="Keyboard 2"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-keyboard-yellow2.webp"
                    alt="Keyboard 2"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Design From Outside</h3>
                  <p>The Mercury K1 Pro is forged from a strong yet lightweight aluminum alloy for the perfect balance of durability and portability. The branching skeletal frame supports and stabilizes each keystroke with an elegant symmetry that almost feels alive, as though it's still in motion, constantly reforging itself. Evolving. You'd better keep a close eye on this one. </p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>A Brilliant Aura of Power</h3>
                  <p>Harness the K1 Pro's two integrated RGB lighting systems, offering a choice of 16.8 million colors. The south-facing key backlights provide 13 different lighting modes, with custom options for lighting speed, brightness, and color changes.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-keyboard-yellow3.webp"
                    alt="Keyboard 3"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );

        case 5:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury K1 - Gradient White</span>
              <h2>Synthesize and Thrive</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>One-of-a-Kind: Uniquely YoursThe Refined and Streamlined Mercury K1</h3>
                  <p>Be ready for anything with the next evolution of the K1 design clade. Aethereal catalysts have reforged the living metal, coalescing and condensing it into a streamlined form that still glows with its own inner radiance. The recursive metal branches have flowed around rows of custom Kailh Linear switches, ready for input and perfectly balanced for any challenge that lies ahead.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-keyboard-white1.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-keyboard-white3.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <p>The Mercury K1 is about balance in all things, weaving strength and lightness into each curve of its aluminum alloy exoskeleton. The flowing metal frame stands strong under every keystroke, providing a symmetrical stability that is perfectly positioned for intense gaming and comfortable typing.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>A Core of Quiet Strength</h3>
                  <p>Gasket-mounted FR4 Plate holds each switch firmly in place, create a balanced typing experience no matter where you are in this world</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-keyboard-white2.webp"
                    alt="Keyboard 3"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
const getRandomProducts = (data, excludeId, count = 3) => {
    const filtered = data.filter(item => item.id !== excludeId);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const randomKeyboards = getRandomProducts(keyboardData, keyboard.id);
  return (
    <div className={styles.productPageContainer}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <Link href="/keyboard">Keyboard</Link>
        <span>{keyboard.name}</span>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={keyboard.image}
              alt={keyboard.name}
              width={600}
              height={600}
              priority
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.productTitle}>
            {keyboard.title || keyboard.name}
          </h1>

          <ProductActions
            product={keyboard}
            category="keyboard"
          />
        </div>
      </div>

      {renderExtraContent()}
      <div className={styles.recommendations}>
        <h2>Explore More</h2>
        <div className={styles.productGrid}>
            {randomKeyboards.map((item) => (
                <Link href={`/keyboard/${item.id}`} key={item.id} className={styles.productCard}>
                    <Image src={item.image} alt={item.name} width={200} height={200} />
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                </Link>
            ))}
        </div>
    </div>
    </div>
  );
};

export default KeyboardPage;
