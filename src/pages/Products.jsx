import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, getProductsByCategory } from '../utils/products';
import { addToCart } from '../utils/cartUtils';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import '../styles/Products.css';

/**
 * Products Page Component
 * Displays product catalog with filtering capabilities
 * Demonstrates Hooks: useState, useMemo
 */
const Products = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Products';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  // Filter products based on category, price, and search term
  const filteredProducts = useMemo(() => {
    let filtered = getProductsByCategory(selectedCategory);

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter(p => p.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(p => p.price <= parseFloat(priceRange.max));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, priceRange, searchTerm]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setNotificationMessage(`${product.name} added to cart!`);
    setTimeout(() => setNotificationMessage(''), 2000);
    onAddToCart?.(product);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Perfume Collection</h1>
        <p>Explore our curated selection of premium fragrances</p>
      </div>

      <div className="products-search">
        <input
          type="text"
          placeholder="Search perfumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
      </div>

      {notificationMessage && (
        <div className="notification">{notificationMessage}</div>
      )}

      <div className="products-container">
        <Filters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
        />

        <div className="products-section">
          <div className="results-info">
            <p>{filteredProducts.length} products found</p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSearchTerm('');
                  setPriceRange({ min: '', max: '' });
                }}
                className="reset-filters-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
