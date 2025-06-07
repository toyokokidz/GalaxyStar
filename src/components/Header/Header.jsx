import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import AuthModal from '../Auth/AuthModal'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useCart } from '../../context/CartContext.jsx'
import { useToast } from '../../context/ToastContext'

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { cartItems } = useCart()
  const { showSuccess } = useToast()

  const getCartCount = () => {
    return cartItems ? cartItems.reduce((total, item) => total + (item.quantity || 1), 0) : 0;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setIsDropdownOpen(false)
    showSuccess('Вы успешно вышли из аккаунта')
  }

  const truncateName = (name) => {
    return name?.length > 10 ? `${name.slice(0, 10)}...` : name
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.left}>
            <Link href="/keyboard" className={styles.link}>Keyboard</Link>
            <Link href="/mouse" className={styles.link}>Mouse</Link>
            <Link href="/accessoires" className={styles.link}>Accessoires</Link>
          </div>
          <div className={styles.center}>
            <Link href="/" className={styles.logo}>
              GalaxyStar
            </Link>
          </div>
          <div className={styles.right}>
            <Link href="/support" className={styles.link}>Support</Link>
            <Link href="/cart" className={styles.link} data-cart-button>Cart ({getCartCount()})</Link>
            <ThemeToggle />
            {user ? (
              <div className={styles.userMenu}>
                <button 
                  className={styles.link}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {truncateName(user.name)}
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    <button 
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className={styles.link}
                onClick={() => setIsAuthModalOpen(true)}
              >
                Log in
              </button>
            )}
          </div>
        </nav>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </header>
  )
}

export default Header