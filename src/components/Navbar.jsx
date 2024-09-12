import styles from '../styles/Navbar.module.css';
import { NavLink } from 'react-router-dom';
import cartIcon from '../assets/cart.png';

const Navbar = ({ totalNumberItems }) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.hideLink : '')}
          >
            <div className={styles.backToShop}>Continue Shopping</div>
          </NavLink>
        </li>
        <li>
          <h1 className={styles.logo}>K's Shop</h1>
        </li>
        <li>
          <NavLink
            to="/cart"
          >
            <div className={styles.cartDiv}>
              <img src={cartIcon} alt='cart icon' className={styles.cartIcon} /> 
              {totalNumberItems > 0 && <div class={styles.cartBadge} data-testid='cartBadge'>{totalNumberItems}</div>}
            </div>
            
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
