import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../utils/cartUtils';
import '../styles/CartItem.css';

/**
 * CartItem Component
 * Displays individual cart item with quantity controls
 * Demonstrates Props and State management
 */
const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = React.useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const itemTotal = item.price * quantity;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-info">{item.volume} - {item.concentration}</p>
        <p className="cart-item-price">{formatPrice(item.price)} per unit</p>
      </div>

      <div className="cart-item-quantity">
        <button 
          className="qty-btn"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input 
          type="number" 
          min="1" 
          max="99" 
          value={quantity}
          onChange={handleQuantityChange}
          className="qty-input"
          aria-label={`Quantity of ${item.name}`}
        />
        <button 
          className="qty-btn"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <span className="total-price">{formatPrice(itemTotal)}</span>
      </div>

      <button 
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        ✕
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    volume: PropTypes.string.isRequired,
    concentration: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired
};

export default CartItem;
