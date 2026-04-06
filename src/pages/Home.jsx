import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/**
 * Home Page Component
 * Landing page with hero section and featured products
 */
const Home = ({ onNavigateToProducts }) => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Enchanted Alchemy</h1>
          <p className="hero-subtitle">Discover Premium Fragrances That Define Your Style</p>
          <p className="hero-description">
            From timeless classics to modern creations, find the perfect scent for every moment.
          </p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Enchanted Alchemy?</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">✨</span>
            <h3>Premium Quality</h3>
            <p>Carefully curated fragrances from the world's finest perfumeries</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <h3>Fast Shipping</h3>
            <p>Quick and secure delivery to your doorstep</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🛡️</span>
            <h3>Satisfaction Guaranteed</h3>
            <p>30-day money-back guarantee on all purchases</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💳</span>
            <h3>Secure Checkout</h3>
            <p>Safe and encrypted payment methods</p>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-preview">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?category=Men" className="category-card men">
            <h3>For Men</h3>
            <p>Bold & Masculine Fragrances</p>
          </Link>
          <Link to="/products?category=Women" className="category-card women">
            <h3>For Women</h3>
            <p>Elegant & Feminine Scents</p>
          </Link>
          <Link to="/products?category=Unisex" className="category-card unisex">
            <h3>Unisex</h3>
            <p>Versatile for Everyone</p>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p className="testimonial-text">
              "Enchanted Alchemy has the best selection of fragrances. My order arrived quickly and smelled amazing!"
            </p>
            <p className="testimonial-author">- Sarah M.</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">
              "Finally found my signature scent here. The customer service was fantastic!"
            </p>
            <p className="testimonial-author">- James K.</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">
              "Excellent quality fragrances at competitive prices. Highly recommended!"
            </p>
            <p className="testimonial-author">- Emma T.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Join Our Newsletter</h2>
        <p>Get exclusive offers and updates on new fragrances</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email"
            required
            aria-label="Email address for newsletter"
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
