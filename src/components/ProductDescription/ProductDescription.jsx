import { useState } from 'react';
import styles from '../../components/Accessoires/Accessoires.module.scss';

export default function ProductDescription({
                                               product,
                                               showDescription = true,
                                       }) {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

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
                    <button
                        onClick={() => setDescriptionVisible(!isDescriptionVisible)}
                        className={styles.toggleButton}
                    >
                        {isDescriptionVisible ? 'Hide Description' : 'Show Description'}
                    </button>
                    {isDescriptionVisible && renderDescription()}
                </div>
            )}
        </div>
    );
}