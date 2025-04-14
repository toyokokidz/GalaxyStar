import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Cart.module.scss';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    incrementQuantity, 
    decrementQuantity
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 150;
  
  // Calculate total and items count directly
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat((item.price_sale || item.price || '0').replace('$', ''));
    return sum + (price * (item.quantity || 1));
  }, 0);
  
  const itemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const shippingProgress = (total / FREE_SHIPPING_THRESHOLD) * 100;

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1>Cart ({itemsCount} items)</h1>
        
        <div className={styles.shippingProgress}>
          {remainingForFreeShipping > 0 ? (
            <p>Spend ${remainingForFreeShipping.toFixed(2)} more and get free shipping! (U.S.)</p>
          ) : (
            <p>You've got free shipping! (U.S.)</p>
          )}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${Math.min(100, shippingProgress)}%` }}
            />
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <h2>Your cart is empty</h2>
            <Link href="/products" className={styles.continueShoppingButton}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartItems}>
              <div className={styles.header}>
                <span>Product</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {cartItems.map((item) => {
                const currentQuantity = item.quantity || 1;
                const itemPrice = parseFloat((item.price_sale || item.price || '0').replace('$', ''));
                const itemTotal = itemPrice * currentQuantity;

                return (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.productInfo}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
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
                        onClick={() => decrementQuantity(item.id)}
                        disabled={currentQuantity <= 1}
                        className={styles.quantityButton}
                      >
                        -
                      </button>
                      <span>{currentQuantity}</span>
                      <button 
                        onClick={() => incrementQuantity(item.id)}
                        className={styles.quantityButton}
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
                  <span>${total.toFixed(2)}</span>
                </div>
                <div>
                  <span>Shipping</span>
                  <span>{total >= FREE_SHIPPING_THRESHOLD ? 'Free' : `$${remainingForFreeShipping.toFixed(2)} to free shipping`}</span>
                </div>
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <textarea 
                className={styles.orderNote}
                placeholder="Order note"
              />
              <Link href="/checkout">
                <button className={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 