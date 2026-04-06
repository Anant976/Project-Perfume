import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../utils/products';
import { addToCart, formatPrice, getDiscountPercentage } from '../utils/cartUtils';
import '../styles/ProductDetails.css';

/**
 * Product Details Page Component
 * Displays detailed information about a single product
 * Demonstrates Hooks: useState, useParams, useNavigate
 */
const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(parseInt(id, 10));
  
  const [quantity, setQuantity] = useState(1);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/products')} className="back-button">
          Back to Products
        </button>
      </div>
    );
  }

  const discountPercentage = getDiscountPercentage(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setNotificationMessage(`${quantity} x ${product.name} added to cart!`);
    setTimeout(() => setNotificationMessage(''), 3000);
    onAddToCart?.(product);
  };

  const handleQuantityChange = (value) => {
    if (value > 0 && value < 100) {
      setQuantity(value);
    }
  };

  return (
    <div className="product-details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      {notificationMessage && (
        <div className="success-notification">{notificationMessage}</div>
      )}

      <div className="product-details">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image-large" />
          {discountPercentage > 0 && (
            <div className="discount-banner">{discountPercentage}% OFF</div>
          )}
        </div>

        <div className="product-info-section">
          <span className="product-category-badge">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating-section">
            <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="rating-value">{product.rating}</span>
            <span className="reviews-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-section">
            <span className="price-main">{formatPrice(product.price)}</span>
            {discountPercentage > 0 && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="product-description-main">{product.description}</p>

          <div className="product-specifications">
            <div className="spec">
              <span className="spec-label">Volume:</span>
              <span className="spec-value">{product.volume}</span>
            </div>
            <div className="spec">
              <span className="spec-label">Concentration:</span>
              <span className="spec-value">{product.concentration}</span>
            </div>
          </div>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="qty-decrease"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                  className="qty-input"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="qty-increase"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn-large"
            >
              Add to Cart - {formatPrice(product.price * quantity)}
            </button>
          </div>

          <div className="shipping-info">
            <p>✓ Free shipping on orders over Rs.50</p>
            <p>✓ 30-day money-back guarantee</p>
            <p>✓ Secure checkout</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="tab-panel">
              <h3>Description</h3>
              <p>{product.description}</p>
              <p>This premium fragrance is perfect for those who appreciate quality and elegance. Each bottle is crafted with care using the finest ingredients.</p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="tab-panel">
              <h3>Key Ingredients</h3>
              <ul className="ingredients-list">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-panel">
              <h3>Customer Reviews</h3>
              <p>This product has {product.reviews} reviews with an average rating of {product.rating} stars.</p>
              <p>Customers love the quality and lasting power of this fragrance!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
