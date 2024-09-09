import styles from '../styles/Home.module.css';
import { useOutletContext } from 'react-router-dom';
import Card from './Card';
import products from '../products';

const Home = () => {
  const { addToCart } = useOutletContext();

  return (
    <div>
      <h1>K's Shop</h1>
      {products.map(product => (
        <Card key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
