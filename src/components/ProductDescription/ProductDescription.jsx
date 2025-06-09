import { useState, useRef, useEffect } from 'react';
import styles from './ProductDescription.module.scss';


export default function ProductDescription({
                                               product,
                                               showDescription = true,
                                           }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [needsExpand, setNeedsExpand] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const element = descriptionRef.current;
            const contentOverflows = element.scrollHeight > 326;
            setNeedsExpand(contentOverflows);

            if (contentOverflows) {
                element.style.maxHeight = '288px';
            }
        }
    }, [product.description]);

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
            {showDescription && product.description && (
                <div className={styles.descriptionSection}>
                    <div
                        ref={descriptionRef}
                        className={`${styles.descriptionContainer} ${isExpanded ? styles.expanded : ''}`}
                        style={{
                            maxHeight: isExpanded ? 'none' : (needsExpand ? '288px' : 'none'),
                            WebkitMaskImage: !isExpanded && needsExpand
                                ? 'linear-gradient(to bottom, black calc(100% - 50px), transparent)'
                                : 'none',
                        }}
                    >
                        {renderDescription()}
                    </div>

                    {needsExpand && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={styles.expandButton}
                        >
                            {isExpanded ? 'Hide' : 'Expand'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}