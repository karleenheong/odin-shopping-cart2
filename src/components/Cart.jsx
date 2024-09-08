import styles from '../styles/Cart.module.css';
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice } = useOutletContext();

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
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => removeFromCart(product)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div>
        Total: ${totalPrice}
      </div>
    </div>
  );
};

export default Cart;
