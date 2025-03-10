import { useEffect } from 'react'
import styles from './ImageModal.module.scss'

const ImageModal = ({ image, alt, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent}>
        <img src={image} alt={alt} />
      </div>
    </div>
  )
}

export default ImageModal 