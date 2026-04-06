import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCartItemCount } from './utils/cartUtils';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/App.css';

/**
 * App Component
 * Main application component with React Router configuration
 * Demonstrates:
 * - React Router for navigation
 * - Hooks for state management
 * - Props passing between components
 * - Component composition
 */
function App() {
  const [cartCount, setCartCount] = useState(0);

  // Update cart count on mount and when cart changes
  useEffect(() => {
    updateCartCount();
    
    // Listen for storage changes (cart updates)
    const handleStorageChange = () => {
      updateCartCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateCartCount = () => {
    setCartCount(getCartItemCount());
  };

  const handleAddToCart = (product) => {
    updateCartCount();
  };

  return (
    <Router>
      <div className="app">
        <Header cartCount={cartCount} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onNavigateToProducts={() => {}} />} />
            <Route 
              path="/products" 
              element={<Products onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetails onAddToCart={handleAddToCart} />} 
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
