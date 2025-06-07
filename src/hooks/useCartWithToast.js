import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const useCartWithToast = () => {
  const cart = useCart();
  const { showSuccess, showWarning } = useToast();

  const addToCartWithToast = (product) => {
    const existingItem = cart.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      showWarning(`${product.name} уже в корзине. Количество увеличено!`);
    } else {
      showSuccess(`${product.name} добавлен в корзину!`);
    }
    
    cart.addToCart(product);
  };

  const removeFromCartWithToast = (productId) => {
    const item = cart.cartItems.find(item => item.id === productId);
    if (item) {
      showSuccess(`${item.name} удален из корзины`);
    }
    cart.removeFromCart(productId);
  };

  const clearCartWithToast = () => {
    if (cart.cartItems.length > 0) {
      showSuccess('Корзина очищена');
    }
    cart.clearCart();
  };

  return {
    ...cart,
    addToCart: addToCartWithToast,
    removeFromCart: removeFromCartWithToast,
    clearCart: clearCartWithToast
  };
}; 