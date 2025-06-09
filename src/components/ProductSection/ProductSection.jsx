import { useEffect, useRef } from 'react';
import styles from './ProductSection.module.scss';

const ProductSection = ({ product, accessory }) => {
    const item = product || accessory;
    const flexLinesRef = useRef([]);

    useEffect(() => {
        if (!item?.productDetails) return;

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
    }, [item]);

    if (!item?.productDetails) return null;

    const { heading, features } = item.productDetails;

    return (
        <div className={styles.container2}>
            <div className={styles.heading}>
                <span>{heading.subtitle}</span>
                <h2>{heading.title}</h2>
                {heading.description && (
                    <p className={styles.headingName}>{heading.description}</p>
                )}
            </div>

            <div className={styles.flexContainer}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={styles.flexLine}
                        ref={(el) => (flexLinesRef.current[index] = el)}
                    >
                        <div className={styles.flexItem}>
                            {index % 2 === 0 ? (
                                <>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </>
                            ) : (
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className={styles.image}
                                />
                            )}
                        </div>
                        <div className={styles.flexItem}>
                            {index % 2 === 0 ? (
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className={styles.image}
                                />
                            ) : (
                                <>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSection;