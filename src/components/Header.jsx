import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCartItemCount } from '../utils/cartUtils';
import '../styles/Header.css';

/**
 * Header Component
 * Displays navigation and branding with cart icon
 * Uses Props Validation with PropTypes
 */
const Header = ({ cartCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">💐</span>
            Enchanted Alchemy
          </Link>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
        </nav>

        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  cartCount: PropTypes.number
};

export default Header;
