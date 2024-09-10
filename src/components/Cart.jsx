import styles from '../styles/Cart.module.css';
import { useOutletContext } from 'react-router-dom';
import trashIcon from '../assets/trash.png';

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice, updateQuantity, calcSubtotal } =
    useOutletContext();

  const increaseQuantity = product => {
    if (product.quantity < 999) {
      updateQuantity(product, 1);
    }
  };

  const decreaseQuantity = product => {
    if (product.quantity > 1) {
      updateQuantity(product, -1);
    } else {
      removeFromCart(product);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Your Cart</h1>

      <div className={styles.productsDiv}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyTxt}>Your Cart is Empty</div>
        ) : (
          <div>
            <div className={styles.headings}>
              <div id={styles.headingProduct}>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            <hr />

            {cartItems.map(product => (
              <div key={product.id} className={styles.productDiv}>
                <div className={styles.productImg}>
                  <img src={product.image} />
                </div>

                <div className={styles.gridText}>{product.title}</div>

                <div className={styles.gridText}>
                  ${(Math.round(product.price * 100) / 100).toFixed(2)}
                </div>

                <div className={styles.gridText}>
                  <div className={styles.plusMinus}>
                    <button onClick={() => decreaseQuantity(product)}>-</button>
                  </div>
                  <div className={styles.quantity}>{product.quantity}</div>
                  <div className={styles.plusMinus}>
                    <button onClick={() => increaseQuantity(product)}>+</button>
                  </div>

                  <div className={styles.trashBtn}>
                    <button onClick={() => removeFromCart(product)}>
                      <img src={trashIcon} />
                    </button>
                  </div>
                </div>

                <div className={styles.gridText}>{calcSubtotal(product)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
        
      <div className={styles.totalDiv}>
        <div className={styles.totalPrice}>Total: ${totalPrice}</div>
        <button className={styles.checkoutBtn}>Proceed to Checkout</button>
      </div>
      
    </div>
  );
};

export default Cart;
