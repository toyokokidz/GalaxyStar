import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import mouseData from '../../data/mouse.json';
import styles from '../../components/Accessoires/Accessoires.module.scss';
import ProductActions from '../../components/ProductActions/ProductActions';

const MousePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [mouse, setMouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const flexLinesRef = useRef([]);

    useEffect(() => {
        if (!id) return;

        const foundMouse = mouseData.find(item =>
            item.id === parseInt(id) || item.link?.endsWith(id)
        );

        if (!foundMouse) {
            router.push('/404');
            return;
        }

        setMouse(foundMouse);
        setLoading(false);
    }, [id, router]);

    if (loading || !mouse) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
                Loading product...
            </div>
        );
    }

    const renderExtraContent = () => {
    switch (mouse.id) {
      case 2:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury X Pro 8KHz Wireless Gaming Mouse</span>
              <h2>8000Hz Fast and Ultra-Lightweight Gaming Mouse</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Effortless Control for Long Sessions</h3>
                  <p>The 0.8mm magnesium alloy frame strikes the perfect balance between strength and lightness, giving the mouse a durable, premium metallic feel while maintaining its lightweight structure. At just 49g, the Mercury X Pro is designed for fast, precise movements without straining your hand or wrist.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-xpro1.webp"
                    alt="Mercury X Pro 8KHz Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-xpro2.webp"
                    alt="Mercury X Pro 8KHz Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>8,000Hz Polling Rate</h3>
                  <p>With a polling rate of up to 8,000Hz, Mercury X Pro delivers real-time input with 0.125ms latency—ensuring every movement and click registers instantly. This ultra-low latency provides smooth, lag-free gameplay, making it the perfect tool for esports and competitive gaming.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury X Wireless Gaming Mouse</span>
              <h2>Lightweight Aluminum Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Customize Your Playstyle</h3>
                  <p>Add a personal touch to your gaming experience with vibrant RGB lighting. Choose from multiple modes, including Color Flowing, Single Color Breathing, and Neon Mode, or adjust brightness and speed to fit your mood. The Mercury X Pro is not just a mouse—it’s an extension of your setup, bringing your environment to life. The web-based software offers an easier way of configuring everything without downloading software.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-x1.webp"
                    alt="Mercury X Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-x2.webp"
                    alt="Mercury X Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Ultimate Precision and Control</h3>
                  <p>Experience the next level of accuracy with the PAW 3950 optical sensor, which offers a staggering 32,000 DPI range. Whether you’re sniping with pixel-perfect precision or making fast, sweeping movements, the sensor adapts to every situation with zero tracking issues. Fine-tune your sensitivity for different games, giving you the edge in both FPS and MOBA titles. </p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>Superlight 49g</h3>
                  <p>The 0.8mm magnesium alloy frame strikes the perfect balance between strength and lightness, giving the mouse a durable, premium metallic feel while maintaining its lightweight structure. At just 49g, the Mercury X is designed for fast, precise movements without straining your hand or wrist.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-x3.webp"
                    alt="Mercury X Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );

        case 4:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury X & X Pro Special Edition Battle Worn-Yellow</span>
              <h2>Synthesize and Thrive</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Neural Sync: The Mouse That Thinks With You</h3>
                  <p>Powered by adaptive AI, the Helix X9 learns your reflexes, turning instinct into action with zero delay.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-yellow1.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-yellow2.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Phantom Glide: Frictionless, Flawless</h3>
                  <p>With hover-tech sensors and anti-gravity calibration, it moves like an extension of your mind—untethered and effortless.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>Liquid Metal Evolution</h3>
                  <p>Crafted from self-molding nano-alloys, its shape flows seamlessly to fit your grip—now and forever.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-yellow3.webp"
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
              <span>Mercury M1 Pro Gunmetal Gray</span>
              <h2>Magnesium Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Skeletal Frame Design With Magnesium Alloy</h3>
                  <p>The M1 Pro's skeletal frame is crafted from lightweight magnesium alloy for the perfect balance of rugged durability and lightning-fast agility. The unique cutaway design keeps your hand cool when the action heats up, and the optional Teflon foot pads guarantee a smooth slide across any surface.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-gunmetal1.webp"
                    alt="Mercury X Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-gunmetal2.webp"
                    alt="Mercury X Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Ambidextrous Layout</h3>
                  <p>The M1 Pro features an ambidextrous shape that fits perfectly in either hand, no matter your mouse grip style. Palm, tip, and claw grips work equally well so you can focus on your game and not on your technique.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>Crush the Competition</h3>
                  <p>Get pixel-perfect aim every time with the high-precision PAW3395 sensor at the core of the Mercury M1 Pro. Experience the freedom of flawless mouse tracking, no matter your game or playing style.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-gunmetal3.webp"
                    alt="Mercury X Wireless Gaming Mouse"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        case 6:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury M1 Pro Gradient Black</span>
              <h2>Magnesium Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Optimize Your Specs</h3>
                  <p>Choose your optimal polling rate, DPI level, and debounce time for complete control over how your M1 Pro functions, whether you're a patient sniper or a CPS-maxing butterfly clicker.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-gradient1.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-gradient2.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Customize Your Layout</h3>
                  <p>Customize each of the M1 Pro's 5 programmable buttons for perfect control over your game, and record custom macros to unleash your favorite combos with a single click. Set up to 4 different button profiles for different games and quickly switch between them in the GravaStar page driver.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>200/146 Hours Battery Life</h3>
                  <p>Game for up to 146 hours* on a single charge with high-speed 2.4 GHz wireless, or extend your battery life up to 200 hours using Bluetooth 5.1. Keep the game going while recharging with the USB-C wired connection, and play for up to 75 hours on a 1.5-hour charge.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-gradient3.webp"
                    alt="Keyboard 3"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        case 7:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury M2 - Stealth Black</span>
              <h2>Magnesium Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Customizable Grip for Enhanced Gaming</h3>
                  <p>Elevate your gaming with the GravaStar Mercury M2 Gaming Mouse, now featuring cool, customizable grip stickers. These high-quality stickers provide superior traction and ergonomic comfort, ensuring a secure grip during intense sessions. Easy to apply and remove, they allow for effortless customization, improving your control and accuracy for a top-notch gaming experience.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-stealth1.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-stealth2.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Connect Your Way</h3>
                  <p>Thanks to TURBOSPEED technology, the M2 supports 2.4 GHz wireless connectivity for maximum speed and responsiveness, as well as Bluetooth 5.1 and wired USB-C connections for ultimate flexibility and reliability.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>26000 DPI High-Resolution Sensitivity</h3>
                  <p>Best-in-class sensor resolution gives you the freedom to choose the perfect sensitivity for any game and every playing style.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-stealth3.webp"
                    alt="Keyboard 3"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        case 8:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury M2 - Transparent Black</span>
              <h2>Magnesium Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>82 Hours Battery Life</h3>
                  <p>Game for up to 50 hours* on a single charge with high-speed 2.4 GHz wireless witht the RGB lights on all the time, or extend your battery life up to 82 hours using Bluetooth 5.1. Keep the game going while recharging with the USB-C wired connection, and play for up to 82 hours on a 1.5-hour charge.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-transparent1.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-transparent2.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>650 IPS Maximum Acceleration</h3>
                  <p>No matter how fast you need to move, the Mercury M2 is right there with you.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>PAW 3395 Sensor</h3>
                  <p>Best-in-class sensor resolution gives you the freedom to choose the perfect sensitivity for any game and every playing style.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-transparent3.webp"
                    alt="Keyboard 3"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        case 9:
        return (
          <div className={styles.container2}>
            <div className={styles.heading}>
              <span>Mercury M2 - Stealth Black</span>
              <h2>Magnesium Alloy</h2>
            </div>
            <div className={styles.flexContainer}>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[0] = el)}>
                <div className={styles.flexItem}>
                  <h3>Handcrafted Battle-Worn Finish</h3>
                  <p>Competition separates the winners from the losers, but the M1 Pro has already been tested in combat and emerged victorious as a 2024 Red Dot Design Award Winner. Carefully handcrafted with a distressed paint finish, this unique battle-worn style turns the M1 Pro into a statement piece worthy of any serious gaming setup.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-smist1.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[1] = el)}>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-smist2.webp"
                    alt="Keyboard 5"
                    className={styles.image}
                  />
                </div>
                <div className={styles.flexItem}>
                  <h3>Pro Gaming Mouse with High-Precision Tracking</h3>
                  <p>Get pixel-perfect aim every time with the high-precision PAW3395 sensor at the core of the Mercury M1 Pro. Experience the freedom of flawless mouse tracking, no matter your game or playing style.</p>
                </div>
              </div>
              <div className={styles.flexLine} ref={(el) => (flexLinesRef.current[2] = el)}>
                <div className={styles.flexItem}>
                  <h3>Optimize Your Specs</h3>
                  <p>Choose your optimal polling rate, DPI level, and debounce time for complete control over how your M1 Pro functions, whether you're a patient sniper or a CPS-maxing butterfly clicker.</p>
                </div>
                <div className={styles.flexItem}>
                  <img
                    src="/images/galaxy-mouse-smist3.webp"
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

const randomMice = getRandomProducts(mouseData, mouse.id);
    return (
        <div className={styles.productPageContainer}>
            <div className={styles.breadcrumbs}>
                <Link href="/">Home/</Link>
                <Link href="/mouse">Mouse/</Link>
                <span>{mouse.name}</span>
            </div>

            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <div className={styles.mainImageWrapper}>
                        <Image
                            src={mouse.image}
                            alt={mouse.name}
                            width={600}
                            height={600}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.productTitle}>
                        {mouse.title || mouse.name}
                    </h1>

                    <ProductActions
                        product={mouse}
                        category="mouse"
                    />
                </div>
            </div>
            {renderExtraContent()}
            <div className={styles.recommendations}>
                <h2>Explore More</h2>
                <div className={styles.productGrid}>
                    {randomMice.map((item) => (
                        <Link href={`/mouse/${item.id}`} key={item.id} className={styles.productCard}>
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

export default MousePage;