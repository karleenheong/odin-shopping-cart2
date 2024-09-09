import styles from '../styles/Cart.module.css';
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice, updateQuantity } =
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
    <div>
      <h1>Your Cart</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          cartItems.map(product => (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>${(Math.round(product.price * 100) / 100).toFixed(2)}</p>
              <div>
                <button onClick={() => decreaseQuantity(product)}>-</button>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => increaseQuantity(product)}>+</button>
              </div>
              <button onClick={() => removeFromCart(product)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div>Total: ${totalPrice}</div>
    </div>
  );
};

export default Cart;
