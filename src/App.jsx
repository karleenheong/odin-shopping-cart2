import './App.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const [cartItems, setCartItems] = useState([]);

const addToCart = (product, qty) => {
  const existingProduct = cartItems.find(item => item.id === product.id);

  if(existingProduct) {
    setCartItems(
      cartItems.map(item => item.id === product.id 
          ? {...existingProduct, quantity: existingProduct.quantity + qty} 
          : item)
    );
  } else {
    setCartItems([...cartItems, {...product, quantity: qty}]);
  }
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet context={[cartItems, addToCart]} />
    </div>
  );
};

export default App;
