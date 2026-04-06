import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice, getDiscountPercentage } from '../utils/cartUtils';
import '../styles/ProductCard.css';

/**
 * ProductCard Component
 * Reusable component to display individual product
 * Demonstrates Props Validation with PropTypes
 */
const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discountPercentage = getDiscountPercentage(product.originalPrice, product.price);

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          {discountPercentage > 0 && (
            <div className="discount-badge">{discountPercentage}% OFF</div>
          )}
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-rating">
            <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="rating-text">({product.reviews})</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-pricing">
            <span className="product-price">{formatPrice(product.price)}</span>
            {discountPercentage > 0 && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>

      <button 
        className={`add-to-cart-btn ${isAdding ? 'added' : ''}`}
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart`}
      >
        {isAdding ? '✓ Added!' : 'Add to Cart'}
      </button>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
