import { useCart } from '../context/CartContext';
import styles from '../styles/Cart.module.scss';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity: updateCartQuantity,
    getCartTotal 
  } = useCart();
  
  const FREE_SHIPPING_THRESHOLD = 150;
  const cartTotal = getCartTotal ? getCartTotal() : 0;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progressPercentage = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (updateCartQuantity && newQuantity >= 1) {
      updateCartQuantity(productId, newQuantity);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1>Cart</h1>
        
        <div className={styles.shippingProgress}>
          {remainingForFreeShipping > 0 ? (
            <p>Spend ${remainingForFreeShipping.toFixed(2)} more and get free shipping! (U.S.)</p>
          ) : (
            <p>You've got free shipping! (U.S.)</p>
          )}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <>
            <div className={styles.cartGrid}>
              <div className={styles.cartItems}>
                <div className={styles.header}>
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
                {cartItems.map((item) => {
                  const itemPrice = parseFloat((item.price_sale || item.price || '0').replace('$', ''));
                  const itemTotal = itemPrice * (item.quantity || 1);
                  const currentQuantity = item.quantity || 1;

                  return (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.productInfo}>
                        <img src={item.image} alt={item.name} />
                        <div>
                          <h3>{item.name}</h3>
                          <p className={styles.price}>
                            {item.price_sale || item.price}
                            {item.price_sale && (
                              <span className={styles.oldPrice}>{item.price_old}</span>
                            )}
                          </p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className={styles.removeButton}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className={styles.quantity}>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, currentQuantity - 1)}
                          disabled={currentQuantity <= 1}
                        >
                          -
                        </button>
                        <span>{currentQuantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, currentQuantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.total}>
                        ${itemTotal.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.summary}>
                <h2>Summary</h2>
                <div className={styles.summaryDetails}>
                  <div>
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <span>{remainingForFreeShipping > 0 ? 'Calculated at checkout' : 'Free'}</span>
                  </div>
                </div>
                <div className={styles.total}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <textarea 
                  className={styles.orderNote}
                  placeholder="Order note"
                />
                <button className={styles.checkoutButton}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 