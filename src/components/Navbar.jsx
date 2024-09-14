import styles from '../styles/Navbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import cartIcon from '../assets/cart.png';

const Navbar = ({ totalNumberItems }) => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

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
        <li className={isCartPage ? styles.hideLogo : ''}>
          <h1 className={styles.logo}>K's Shop</h1>
        </li>
        <li>
          <NavLink to="/cart">
            <div className={styles.cartDiv}>
              <img src={cartIcon} alt="cart icon" className={styles.cartIcon} />
              {totalNumberItems > 0 && (
                <div className={styles.cartBadge} data-testid="cart-badge">
                  {totalNumberItems}
                </div>
              )}
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
