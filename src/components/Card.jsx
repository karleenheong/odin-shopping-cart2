import styles from '../styles/Card.module.css';
import { useState } from 'react';

const Card = ({ product, addToCart }) => {
  const [inputValue, setInputValue] = useState('1');
  const [showInvalidMsg, setInvalidMsg] = useState(false);
  const [inCart, setInCart] = useState(false);

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
      setInCart(true);
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
      <div>
        <img
          className={styles.productImg}
          src={product.image}
          alt="product image"
        />
        <p data-testid="title">{product.title}</p>
      </div>

      <div className={styles.lowerDiv}>
        <div className={styles.price}>
          <p data-testid="price">
            ${(Math.round(product.price * 100) / 100).toFixed(2)}
          </p>
        </div>

        <div className={styles.quantityDiv}>
          <div className={styles.plusMinus}>
            {inCart ? (
              <button
                onClick={decrement}
                className={styles.disabled}
                data-testid="decrement-cart"
              >
                -
              </button>
            ) : (
              <button onClick={decrement} data-testid="decrement">
                -
              </button>
            )}
          </div>
          <div className={styles.quantityInput}>
            {inCart ? (
              <input
                type="text"
                value={inputValue}
                className={styles.disabled}
              />
            ) : (
              <input type="text" value={inputValue} onChange={handleChange} />
            )}
          </div>
          <div className={styles.plusMinus}>
            {inCart ? (
              <button
                onClick={increment}
                className={styles.disabled}
                data-testid="increment-cart"
              >
                +
              </button>
            ) : (
              <button onClick={increment} data-testid="increment">
                +
              </button>
            )}
          </div>
          {showInvalidMsg && (
            <p className={styles.invalidMsg}>
              Invalid Quantity. Please enter a whole number between 1 and 999.
            </p>
          )}
        </div>

        <div>
          {inCart ? (
            <p className={styles.inCart}>In cart</p>
          ) : (
            <button
              onClick={handleAddToCart}
              className={styles.atcBtn}
              data-testid="atc"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
