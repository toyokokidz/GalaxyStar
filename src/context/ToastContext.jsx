import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Автоматически удаляем toast через duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, duration) => showToast(message, 'success', duration);
  const showError = (message, duration) => showToast(message, 'error', duration);
  const showWarning = (message, duration) => showToast(message, 'warning', duration);
  const showInfo = (message, duration) => showToast(message, 'info', duration);

  return (
    <ToastContext.Provider value={{
      showToast,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      removeToast
    }}>
      {children}
      
      {/* Рендерим все активные toasts */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 10000 }}>
        {toasts.map((toast, index) => (
          <div key={toast.id} style={{ marginBottom: index > 0 ? '10px' : '0' }}>
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={true}
              onClose={() => removeToast(toast.id)}
              duration={0} // Отключаем автозакрытие, так как управляем этим в контексте
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}; 