import { createContext, useContext, useEffect, useState } from 'react'

const AccessibilityContext = createContext()

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

const AccessibilityProvider = ({ children }) => {
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [focusOutlineVisible, setFocusOutlineVisible] = useState(false)

  useEffect(() => {
    // Отслеживаем использование клавиатуры для навигации
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ' || e.key.startsWith('Arrow')) {
        setIsKeyboardNavigation(true)
        setFocusOutlineVisible(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardNavigation(false)
      setFocusOutlineVisible(false)
    }

    // Добавляем CSS класс для видимости outline
    useEffect(() => {
      if (focusOutlineVisible) {
        document.body.classList.add('keyboard-navigation')
      } else {
        document.body.classList.remove('keyboard-navigation')
      }
    }, [focusOutlineVisible])

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  // Функция для объявления сообщений экранным читалкам
  const announce = (message, priority = 'polite') => {
    const id = Date.now().toString()
    const announcement = { id, message, priority }
    
    setAnnouncements(prev => [...prev, announcement])
    
    // Удаляем объявление через короткое время
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== id))
    }, 1000)
  }

  // Функция для пропуска к основному содержимому
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Функция для установки фокуса на элемент
  const setFocus = (selector) => {
    const element = document.querySelector(selector)
    if (element) {
      element.focus()
    }
  }

  // Функция для создания уникального ID для accessibility
  const generateId = (prefix = 'a11y') => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const value = {
    isKeyboardNavigation,
    announce,
    skipToMain,
    setFocus,
    generateId,
    focusOutlineVisible
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Live region для объявлений экранным читалкам */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      >
        {announcements
          .filter(a => a.priority === 'polite')
          .map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
      
      <div
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      >
        {announcements
          .filter(a => a.priority === 'assertive')
          .map(a => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>

      {/* Кнопка "Перейти к основному содержимому" */}
      <button
        className="skip-to-main"
        onClick={skipToMain}
        style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: '#007bff',
          color: 'white',
          padding: '8px 16px',
          textDecoration: 'none',
          borderRadius: '4px',
          border: 'none',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 1000,
          opacity: 0,
          transform: 'translateY(-20px)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onFocus={(e) => {
          e.target.style.top = '6px'
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }}
        onBlur={(e) => {
          e.target.style.top = '-40px'
          e.target.style.opacity = '0'
          e.target.style.transform = 'translateY(-20px)'
        }}
      >
        Перейти к основному содержимому
      </button>

      {/* Глобальные стили для accessibility */}
      <style jsx global>{`
        /* Стили для клавиатурной навигации */
        .keyboard-navigation *:focus {
          outline: 2px solid #007bff !important;
          outline-offset: 2px !important;
        }

        /* Скрытие outline при использовании мыши */
        body:not(.keyboard-navigation) *:focus {
          outline: none !important;
        }

        /* Улучшения для экранных читалок */
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* Высокий контраст для лучшей видимости */
        @media (prefers-contrast: high) {
          * {
            border-color: #000 !important;
          }
          
          button, a {
            border: 1px solid #000 !important;
          }
        }

        /* Уменьшенная анимация для пользователей с вестибулярными расстройствами */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Улучшения для людей с дислексией */
        @media (prefers-reading-ease: high) {
          * {
            font-family: 'Arial', 'Helvetica', sans-serif !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </AccessibilityContext.Provider>
  )
}

export default AccessibilityProvider 