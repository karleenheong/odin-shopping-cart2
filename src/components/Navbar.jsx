import styles from '../styles/Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li><NavLink to='/'className={({isActive}) => isActive ? styles.hideLink : ''}>Back to Shop</NavLink></li>
        <li><NavLink to='/cart' className={({isActive}) => isActive ? styles.hideLink : ''}>Cart</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;