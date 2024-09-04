import styles from '../styles/Home.module.css';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Bar Soap',
    price: 3.00
  },
  {
    id: 2,
    name: 'Hand Spray',
    price: 5.00
  },
];

const Home = () => {
  const { addToCart } = useOutletContext();

  return (
    <div>
      <h1>K's Shop</h1>
      {products.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>${price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Home;