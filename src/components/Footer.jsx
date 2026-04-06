import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

/**
 * Footer Component
 * Displays footer information and links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Enchanted Alchemy brings you the finest selection of premium fragrances from around the world.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: <a href="mailto:info@enchantedalchemy.com">info@enchantedalchemy.com</a></p>
          <p>Phone: <a href="tel:+91 99719 77499">+91 99719 77499</a></p>
          <p>Hours: Mon-Fri 9AM-6PM EST</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Enchanted Alchemy. All rights reserved. | Designed with 💜 using React</p>
      </div>
    </footer>
  );
};

export default Footer;
