import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartFromLocalStorage, updateCartQuantity, removeFromCart, clearCart, getCartTotal, formatPrice } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import '../styles/Cart.css';

/**
 * Cart Page Component
 * Displays shopping cart with items and checkout functionality
 * Demonstrates Hooks: useState, useEffect
 */
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const cart = getCartFromLocalStorage();
    setCartItems(cart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCartItems(getCartFromLocalStorage());
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      updateCartQuantity(productId, quantity);
      setCartItems(getCartFromLocalStorage());
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setCartItems([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
    setCartItems([]);
    setShowCheckoutForm(false);

    // Show success message for 3 seconds then redirect
    setTimeout(() => {
      setOrderPlaced(false);
      window.location.href = '/';
    }, 3000);
  };

  const cartTotal = getCartTotal();
  const subtotal = cartTotal;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-message">
          <h1>✓ Order Placed Successfully!</h1>
          <p>Thank you for your purchase!</p>
          <p>Your order has been confirmed and will be shipped soon.</p>
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Items ({cartItems.length})</h2>
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveFromCart}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (8%):</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>

              {shipping === 0 && (
                <p className="free-shipping-message">✓ Free shipping applied!</p>
              )}

              <button
                className="checkout-btn"
                onClick={() => setShowCheckoutForm(!showCheckoutForm)}
              >
                {showCheckoutForm ? 'Cancel' : 'Proceed to Checkout'}
              </button>

              <Link to="/products" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>

            {showCheckoutForm && (
              <form className="checkout-form" onSubmit={handleCheckout}>
                <h3>Shipping Information</h3>

                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      id="zipCode"
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="place-order-btn">
                  Place Order - {formatPrice(total)}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
