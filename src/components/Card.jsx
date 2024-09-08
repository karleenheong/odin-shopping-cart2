import styles from '../styles/Card.module.css';
import { useState } from 'react';

const Card = ({product, addToCart}) => {
  const [inputValue, setInputValue] = useState('1');
  const [showInvalidMsg, setInvalidMsg] = useState(false);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const validInput = () => {
    const inputNoSpace = inputValue.replace(/\s/g, '');
    const regex = /^[1-9]\d{0,2}$/;
    return regex.test(inputNoSpace);
  };

  const handleAddToCart = () => {
    if(validInput()) {
      setInvalidMsg(false);
      const quantity =  Number(inputValue);
      addToCart(product, quantity);
    } else {
      setInvalidMsg(true);
    }
  }

  return (
    <div>
      <div>
        <p>{product.name}</p>
        <p>${(Math.round(product.price * 100) / 100).toFixed(2)}</p>
      </div>
      <div>
        <button onClick={() => decrement}>-</button>
        <input type='text' value={inputValue} onChange={handleChange} />
        <button onClick={() => increment}>+</button>
        {showInvalidMsg && <p className={styles.invalidMsg}>Invalid Quantity. Please enter a whole number between 1 and 999.</p>}
      </div>
      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
