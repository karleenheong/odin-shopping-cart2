import styles from '../styles/Home.module.css';
import { useOutletContext } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Bar Soap',
    price: 3.0,
  },
  {
    id: 2,
    name: 'Hand Spray',
    price: 5.0,
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
          <p>${(Math.round(product.price * 100) / 100).toFixed(2)}</p>
          <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
