import styles from '../styles/Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({totalNumberItems}) => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.hideLink : '')}
          >
            Back to Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.hideLink : '')}
          >
            Cart {totalNumberItems}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
