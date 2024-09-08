import styles from '../styles/Home.module.css';
import { useOutletContext } from 'react-router-dom';
import Card from './Card';

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
        <Card key={product.id} product={product} addToCart={addToCart}/>
      ))}
    </div>
  );
};

export default Home;
