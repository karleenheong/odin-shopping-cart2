import styles from '../styles/Card.module.css';
import { useState } from 'react';

const Card = ({ product, addToCart }) => {
  const [inputValue, setInputValue] = useState('1');
  const [showInvalidMsg, setInvalidMsg] = useState(false);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const validInput = () => {
    const regex = /^[1-9]\d{0,2}$/;
    return regex.test(inputValue);
  };

  const handleAddToCart = () => {
    if (validInput()) {
      setInvalidMsg(false);
      const quantity = Number(inputValue);
      addToCart(product, quantity);
    } else {
      setInvalidMsg(true);
    }
  };

  const increment = () => {
    const quantity = Number(inputValue);
    if (validInput() && quantity < 999) {
      console.log('increment');
      setInputValue(quantity + 1);
    }
  };

  const decrement = () => {
    const quantity = Number(inputValue);
    if (validInput() && quantity > 1) {
      setInputValue(quantity - 1);
    }
  };

  return (
    <div className={styles.productDiv}>
      {/* {showInvalidMsg && alert('Invalid Quantity. Please enter a whole number between 1 and 999.')} */}
      <div>
        <img className={styles.productImg} src={product.image} />
        <p>{product.title}</p>
      </div>
      <div className={styles.lowerDiv}>
        <div className={styles.price}>
          <p>${(Math.round(product.price * 100) / 100).toFixed(2)}</p>
        </div>
        <div className={styles.quantityDiv}>
          <div className={styles.plusMinus}><button onClick={decrement}>-</button></div>
          <div className={styles.quantityInput}><input type="text" value={inputValue} onChange={handleChange} /></div>
          <div className={styles.plusMinus}><button onClick={increment}>+</button></div>
          {showInvalidMsg && (
            <p className={styles.invalidMsg}>
              Invalid Quantity. Please enter a whole number between 1 and 999.
            </p>
          )}
        </div>
        <div>
          <button onClick={handleAddToCart} className={styles.atcBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
