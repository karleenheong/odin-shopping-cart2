import './App.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty) => {
    console.log(`Adding ${qty} of ${product.title} to cart`);
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...existingProduct, quantity: existingProduct.quantity + qty }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: qty }]);
    }
  };

  const removeFromCart = product => {
    console.log(`Removing ${product.title} from cart`);
    setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  const updateQuantity = (product, amount) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? {
                ...existingProduct,
                quantity: existingProduct.quantity + amount,
              }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };

  const totalNumberItems = cartItems.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const totalPrice = (
    Math.round(
      cartItems.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ) * 100,
    ) / 100
  ).toFixed(2);

  const calcSubtotal = (product) => {
    return (Math.round(product.quantity * product.price * 100) / 100).toFixed(2);
  }

  return (
    <div>
      <Navbar totalNumberItems={totalNumberItems} />
      <Outlet
        context={{
          cartItems,
          addToCart,
          removeFromCart,
          totalPrice,
          updateQuantity,
          calcSubtotal
        }}
      />
    </div>
  );
};

export default App;
