import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../components/Accessoires/Accessoires.module.scss';

const ProductSection = ({ accessory }) => {
    const flexLinesRef = useRef([]);

    // Intersection Observer для анимаций
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

    // Рендер деталей аксессуара
    const renderAccessoryDetails = () => {
        switch (accessory.id) {
            case 1:
                return (
                    <>
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
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
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
                    </>
                );
            case 4:
                return (
                    <>
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
                    </>
                );
            case 7:
                return (
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
                );
            default:
                return null;
        }
    };

    // Функция для получения случайных аксессуаров
    const getRandomProducts = (data, excludeId, count = 3) => {
        if (!Array.isArray(data)) return [];
        const filtered = data.filter(item => item.id !== excludeId);
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const accessoryData = require('../../data/accessoires.json') || [];
    const randomAccessory = getRandomProducts(accessoryData, accessory?.id);

    return (
        <div className={styles.container2}>
            {renderAccessoryDetails()}

            <div className={styles.recommendations}>
                <h2>Explore More</h2>
                <div className={styles.productGrid}>
                    {randomAccessory?.map((item) => (
                        <Link href={`/accessory/${item.id}`} key={item.id} className={styles.productCard}>
                            <Image 
                                src={item.image} 
                                alt={item.name} 
                                width={200} 
                                height={200}
                                unoptimized
                            />
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSection;