import { useState, useRef, useEffect } from 'react'
import styles from './OptimizedImage.module.scss'

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false,
  placeholder = 'blur',
  quality = 80,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [imageSrc, setImageSrc] = useState('')
  const imgRef = useRef(null)

  // Создаем WebP версию изображения если доступно
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return ''
    
    // Проверяем поддержку WebP
    const supportsWebP = () => {
      const canvas = document.createElement('canvas')
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    }

    if (supportsWebP() && !originalSrc.includes('.webp')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    }
    return originalSrc
  }

  // Intersection Observer для ленивой загрузки
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Устанавливаем src когда изображение должно загружаться
  useEffect(() => {
    if (isInView && src) {
      setImageSrc(getOptimizedSrc(src))
    }
  }, [isInView, src])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    // Fallback к оригинальному изображению при ошибке
    if (imageSrc !== src) {
      setImageSrc(src)
    }
  }

  return (
    <div 
      ref={imgRef}
      className={`${styles.imageContainer} ${className || ''}`}
      style={{ width, height }}
    >
      {/* Placeholder пока изображение загружается */}
      {!isLoaded && placeholder === 'blur' && (
        <div 
          className={styles.placeholder}
          style={{ 
            width: width || '100%', 
            height: height || '100%',
            backgroundColor: '#f0f0f0'
          }}
        />
      )}
      
      {/* Основное изображение */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
          style={{ width, height }}
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage 