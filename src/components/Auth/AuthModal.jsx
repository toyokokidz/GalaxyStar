import { useState } from 'react'
import styles from './AuthModal.module.scss'

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    auth: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  console.log('Rendering AuthModal:', { 
    isLogin, 
    isOpen,
    headerTitle: isLogin ? 'Welcome back' : 'Create account',
    headerSubtitle: isLogin ? 'Please enter your details' : 'Please fill in the form below'
  })

  if (!isOpen) return null

  const validateEmail = (email) => {
    // Разрешаем только английские буквы, цифры, @ и точку
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/
    if (!email) {
      return 'Email is required'
    }
    if (!emailRegex.test(email)) {
      return 'Please use only English letters, numbers, @ and dot in email'
    }
    return ''
  }

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/
    if (!name) {
      return 'Name is required'
    }
    if (!nameRegex.test(name)) {
      return 'Name should only contain letters and spaces'
    }
    return ''
  }

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 6) {
      return 'Password should be at least 6 characters long'
    }
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({ email: '', password: '', name: '', auth: '' })

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      const data = await response.json()
      console.log('Server response:', { status: response.status, data }) // Отладочный лог

      // Изменяем логику проверки ответа
      if (response.ok && data.user) {
        // Успешная аутентификация
        onAuthSuccess(data.user)
        onClose()
      } else {
        // Обработка ошибки
        const errorMessage = data.error || 'Authentication failed'
        setErrors(prev => ({
          ...prev,
          auth: errorMessage
        }))
      }

    } catch (error) {
      console.error('Auth error:', error)
      setErrors(prev => ({
        ...prev,
        auth: 'An error occurred during authentication'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    setErrors(prev => ({
      ...prev,
      [name]: '',
      auth: ''
    }))
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.header}>
          <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <p>{isLogin ? 'Please enter your details' : 'Please fill in the form below'}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={errors.name ? styles.error : ''}
                required
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? styles.error : ''}
              required
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? styles.error : ''}
              required
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          {errors.auth && <span className={styles.error}>{errors.auth}</span>}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading 
              ? 'Processing...' 
              : (isLogin ? 'Log in' : 'Create account')
            }
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className={styles.switchButton}
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
                setFormData({ email: '', password: '', name: '' })
              }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal 