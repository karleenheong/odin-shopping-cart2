import styles from '../styles/Cart.module.css';
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useOutletContext();

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>${(Math.round(product.price * 100) / 100).toFixed(2)}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
