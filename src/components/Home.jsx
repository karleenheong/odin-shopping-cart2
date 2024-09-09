import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Card from './Card';

const Home = () => {
  const { addToCart } = useOutletContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products: ' + error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className={styles.productsDiv}>
        {products.map(product => (
          <Card
            key={product.id}
            product={product}
            addToCart={addToCart}
            className={styles.productDiv}
            imgClass={styles.productImg}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
