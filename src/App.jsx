import './App.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty) => {
    console.log(`Adding ${qty} of ${product.name} to cart`);
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
    console.log(`Removing ${product.name} from cart`);
    setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  const totalNumberItems = cartItems.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div>
      <Navbar totalNumberItems={totalNumberItems}/>
      <Outlet context={{ cartItems, addToCart, removeFromCart }} />
    </div>
  );
};

export default App;
