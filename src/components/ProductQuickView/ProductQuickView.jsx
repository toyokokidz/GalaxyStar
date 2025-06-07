import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ProductQuickView.module.scss'
import OptimizedImage from '../OptimizedImage/OptimizedImage'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { showSuccess } = useToast()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    showSuccess(`${product.name} добавлен в корзину!`)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть быстрый просмотр"
            >
              ×
            </button>

            <div className={styles.content}>
              <div className={styles.imageSection}>
                <div className={styles.mainImage}>
                  <OptimizedImage
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    priority
                  />
                </div>
                
                {product.images && product.images.length > 1 && (
                  <div className={styles.thumbnails}>
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`Показать изображение ${index + 1}`}
                      >
                        <OptimizedImage
                          src={image}
                          alt={`${product.name} вид ${index + 1}`}
                          width={60}
                          height={60}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.details}>
                <h2 id="quick-view-title" className={styles.title}>
                  {product.name}
                </h2>
                
                <div className={styles.price}>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className={styles.currentPrice}>
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className={styles.discount}>
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <p className={styles.description}>
                  {product.description || 'Премиальное игровое устройство для профессиональных геймеров'}
                </p>

                {product.features && (
                  <div className={styles.features}>
                    <h3>Ключевые особенности:</h3>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.actions}>
                  <div className={styles.quantitySection}>
                    <label htmlFor="quantity">Количество:</label>
                    <div className={styles.quantityControls}>
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Уменьшить количество"
                      >
                        -
                      </button>
                      <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="99"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                  >
                    Добавить в корзину - ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>

                {product.inStock === false && (
                  <div className={styles.outOfStock}>
                    Товар временно отсутствует
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

 