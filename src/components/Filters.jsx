import React from 'react';
import PropTypes from 'prop-types';
import { categories } from '../utils/products';
import '../styles/Filters.css';

/**
 * Filters Component
 * Product filtering sidebar with category selection
 */
const Filters = ({ selectedCategory, onCategoryChange, priceRange, onPriceChange }) => {
  return (
    <aside className="filters">
      <div className="filter-group">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-options">
          {categories.map(category => (
            <label key={category} className="filter-option">
              <input 
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Price Range</h3>
        <div className="price-inputs">
          <input 
            type="number"
            min="0"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
            className="price-input"
          />
        </div>
        <br />
        <div className="price-inputs">
          <input 
            type="number"
            min="0"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
            className="price-input"
          />
        </div>
      </div>
    </aside>
  );
};

Filters.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  priceRange: PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  onPriceChange: PropTypes.func.isRequired
};

export default Filters;
