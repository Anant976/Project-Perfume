// Cart management utilities
export const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("perfume_cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

export const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("perfume_cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCartFromLocalStorage();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity
    });
  }

  saveCartToLocalStorage(cart);
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCartFromLocalStorage();
  const filteredCart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage(filteredCart);
  return filteredCart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCartFromLocalStorage();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }

  saveCartToLocalStorage(cart);
  return cart;
};

export const clearCart = () => {
  saveCartToLocalStorage([]);
  return [];
};

export const getCartTotal = () => {
  const cart = getCartFromLocalStorage();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = () => {
  const cart = getCartFromLocalStorage();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Format price for display
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR"
  }).format(price);
};

// Calculate discount percentage
export const getDiscountPercentage = (originalPrice, currentPrice) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
