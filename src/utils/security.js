/**
 * клирит строку от потенциально опасных HTML тегов и скриптов
 * @param {string} input - 
 * @returns {string} - 
 */
export const sanitizeHTML = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * @param {object} obj - 
 * @returns {object} - 
 */
export const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeHTML(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * @param {string} email 
 * @returns {boolean} 
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * @param {string} password 
 * @returns {object}
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Пароль должен содержать минимум 8 символов');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну цифру');
  }
  
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну букву');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * @param {string} url
 * @returns {string|null} 
 */
export const sanitizeURL = (url) => {
  if (typeof url !== 'string') return null;
  
  try {
    const urlObj = new URL(url);
    
    // разрешаем только безопасные протоколы
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return null;
    }
    
    return urlObj.toString();
  } catch {
    return null;
  }
};

/**
 * @returns {string}
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * @param {function} func 
 * @param {number} wait 
 * @returns {function} 
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * @param {string} filename
 * @returns {boolean}
 */
export const isValidFilename = (filename) => {
  if (typeof filename !== 'string') return false;
  
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
  
  return !invalidChars.test(filename) && 
         !reservedNames.test(filename) && 
         filename.length > 0 && 
         filename.length <= 255 &&
         !filename.startsWith('.') &&
         !filename.endsWith('.');
}; 