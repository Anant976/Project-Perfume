# 🏗️ Component Architecture & API Reference

## Overview

This document provides a complete reference for all components, their props, and how they work together.

---

## 📊 Component Hierarchy

```
App (Router)
├── Header
│   └── Logo, Navigation, Cart Badge
├── Routes
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── Features Grid
│   │   ├── Category Cards
│   │   ├── Testimonials
│   │   └── Newsletter Form
│   │
│   ├── Products Page
│   │   ├── Search Bar
│   │   ├── Filters Component
│   │   │   ├── Category Filter
│   │   │   └── Price Range Filter
│   │   └── Products Grid
│   │       └── ProductCard × n
│   │
│   ├── Product Details Page
│   │   ├── Product Image
│   │   ├── Product Info
│   │   ├── Quantity Selector
│   │   ├── Add to Cart Button
│   │   └── Tabs
│   │       ├── Description
│   │       ├── Ingredients
│   │       └── Reviews
│   │
│   ├── Cart Page
│   │   ├── Cart Items
│   │   │   └── CartItem × n
│   │   └── Cart Summary
│   │       ├── Subtotal
│   │       ├── Tax
│   │       ├── Shipping
│   │       └── Checkout Form
│   │
│   ├── About Page
│   ├── Contact Page
│   └── 404 (Implicit)
│
└── Footer
    ├── About Section
    ├── Quick Links
    ├── Customer Service
    └── Contact Info
```

---

## 🔧 Component API Reference

### Header Component

**File:** `src/components/Header.jsx`

**Purpose:** Navigation bar with logo and cart badge

**Props:**
```javascript
{
  cartCount: PropTypes.number  // Number of items in cart
}
```

**Features:**
- Sticky positioning
- Mobile hamburger menu
- Cart badge showing item count
- Responsive design
- Smooth transitions

**State:**
```javascript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

**Usage:**
```jsx
<Header cartCount={cartCount} />
```

---

### Footer Component

**File:** `src/components/Footer.jsx`

**Purpose:** Footer with links and contact information

**Props:** None

**Features:**
- 4-column layout on desktop
- Responsive to mobile
- Links to all pages
- Contact information
- Copyright notice

**Usage:**
```jsx
<Footer />
```

---

### ProductCard Component

**File:** `src/components/ProductCard.jsx`

**Purpose:** Display individual product in a card format

**Props:**
```javascript
{
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
}
```

**Features:**
- Product image with hover effect
- Discount badge
- Star rating display
- Price with original price strikethrough
- Add to cart button
- Click animation
- Responsive design

**State:**
```javascript
const [isAdding, setIsAdding] = useState(false);
```

**Callbacks:**
```javascript
const handleAddToCart = (product) => {
  // Calls onAddToCart prop
  // Shows "Added!" feedback
};
```

**Usage:**
```jsx
<ProductCard 
  product={product} 
  onAddToCart={handleAddToCart}
/>
```

---

### CartItem Component

**File:** `src/components/CartItem.jsx`

**Purpose:** Display and manage individual cart item

**Props:**
```javascript
{
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
}
```

**Features:**
- Product image
- Item details (name, volume, concentration)
- Quantity selector (-, input, +)
- Item total price
- Remove button
- Responsive layout

**State:**
```javascript
const [quantity, setQuantity] = useState(item.quantity);
```

**Callbacks:**
```javascript
const handleQuantityChange = (newQuantity) => {
  setQuantity(newQuantity);
  onQuantityChange(item.id, newQuantity);
};

const handleRemove = () => {
  onRemove(item.id);
};
```

**Usage:**
```jsx
<CartItem
  item={item}
  onRemove={handleRemoveFromCart}
  onQuantityChange={handleQuantityChange}
/>
```

---

### Filters Component

**File:** `src/components/Filters.jsx`

**Purpose:** Product filtering sidebar

**Props:**
```javascript
{
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  priceRange: PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  onPriceChange: PropTypes.func.isRequired
}
```

**Features:**
- Category radio buttons
- Price range inputs
- Real-time filtering
- Sticky positioning on desktop
- Responsive on mobile

**Usage:**
```jsx
<Filters
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
  priceRange={priceRange}
  onPriceChange={setPriceRange}
/>
```

---

## 📄 Page Components

### Home Page

**File:** `src/pages/Home.jsx`

**Purpose:** Landing page with hero and features

**Features:**
- Hero section with CTA
- Features showcase (4 items)
- Category preview cards
- Customer testimonials
- Newsletter signup

**Props:**
```javascript
{
  onNavigateToProducts: PropTypes.func  // Optional callback
}
```

**Usage:**
```jsx
<Route path="/" element={<Home />} />
```

---

### Products Page

**File:** `src/pages/Products.jsx`

**Purpose:** Product catalog with filtering and search

**State:**
```javascript
const [selectedCategory, setSelectedCategory] = useState(initialCategory);
const [priceRange, setPriceRange] = useState({ min: '', max: '' });
const [searchTerm, setSearchTerm] = useState('');
const [notificationMessage, setNotificationMessage] = useState('');
```

**Hooks:**
```javascript
const filteredProducts = useMemo(() => {
  // Filter by category, price, and search
}, [selectedCategory, priceRange, searchTerm]);
```

**Features:**
- Search bar
- Category filter
- Price range filter
- Product grid with ProductCard components
- Results counter
- Empty state with reset button

**Props:**
```javascript
{
  onAddToCart: PropTypes.func  // Callback when item added
}
```

**Usage:**
```jsx
<Route path="/products" element={<Products />} />
```

---

### ProductDetails Page

**File:** `src/pages/ProductDetails.jsx`

**Purpose:** Detailed product view with specifications and tabs

**State:**
```javascript
const [quantity, setQuantity] = useState(1);
const [notificationMessage, setNotificationMessage] = useState('');
const [activeTab, setActiveTab] = useState('description');
```

**Hooks:**
```javascript
const { id } = useParams();  // Get product ID from URL
const navigate = useNavigate();  // Navigate to other pages
```

**Features:**
- Large product image
- Product info (name, rating, reviews)
- Price with original price
- Specifications (volume, concentration)
- Quantity selector
- Add to cart button
- Tabbed content (Description, Ingredients, Reviews)
- Shipping info banner
- Back button

**Usage:**
```jsx
<Route path="/product/:id" element={<ProductDetails />} />
```

---

### Cart Page

**File:** `src/pages/Cart.jsx`

**Purpose:** Shopping cart management and checkout

**State:**
```javascript
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
```

**Hooks:**
```javascript
useEffect(() => {
  const cart = getCartFromLocalStorage();
  setCartItems(cart);
}, []);
```

**Features:**
- Cart items list (using CartItem components)
- Order summary (subtotal, tax, shipping, total)
- Free shipping for orders over $50
- Clear cart button
- Checkout form with validation
- Order success notification
- Empty cart state

**Callbacks:**
```javascript
const handleRemoveFromCart = (productId) => {
  removeFromCart(productId);
  setCartItems(getCartFromLocalStorage());
};

const handleQuantityChange = (productId, quantity) => {
  updateCartQuantity(productId, quantity);
  setCartItems(getCartFromLocalStorage());
};

const handleCheckout = (e) => {
  e.preventDefault();
  // Validate form
  // Clear cart
  // Show success message
};
```

**Usage:**
```jsx
<Route path="/cart" element={<Cart />} />
```

---

### About Page

**File:** `src/pages/About.jsx`

**Purpose:** Company information page

**Sections:**
- Our Story
- Our Mission
- Why Choose Us
- Quality Assurance

**Usage:**
```jsx
<Route path="/about" element={<About />} />
```

---

### Contact Page

**File:** `src/pages/Contact.jsx`

**Purpose:** Contact form and company contact info

**State:**
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const [submitted, setSubmitted] = useState(false);
```

**Features:**
- Contact information display
- Email, phone, business hours
- Contact form with validation
- Success notification

**Usage:**
```jsx
<Route path="/contact" element={<Contact />} />
```

---

## 🎨 App Component

**File:** `src/App.jsx`

**Purpose:** Main app component with routing setup

**State:**
```javascript
const [cartCount, setCartCount] = useState(0);
```

**Hooks:**
```javascript
useEffect(() => {
  updateCartCount();
  
  // Listen for storage changes
  const handleStorageChange = () => {
    updateCartCount();
  };
  
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
```

**Routes:**
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

**Callbacks:**
```javascript
const handleAddToCart = (product) => {
  updateCartCount();
};
```

**Usage:**
```jsx
// In main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🛠️ Utility Functions

### products.js

```javascript
// Get all products or filtered by category
getProductsByCategory(category) -> Product[]

// Get single product by ID
getProductById(id) -> Product | undefined

// Product data array
products[] // 8 products with full details

// Categories array
categories[] // ['All Products', 'Men', 'Women', 'Unisex']
```

### cartUtils.js

```javascript
// Get cart from localStorage
getCartFromLocalStorage() -> CartItem[]

// Save cart to localStorage
saveCartToLocalStorage(cart) -> void

// Add product to cart
addToCart(product, quantity) -> CartItem[]

// Remove product from cart
removeFromCart(productId) -> CartItem[]

// Update item quantity
updateCartQuantity(productId, quantity) -> CartItem[]

// Clear entire cart
clearCart() -> CartItem[]

// Get total price
getCartTotal() -> number

// Get item count
getCartItemCount() -> number

// Format price as currency
formatPrice(price) -> string

// Calculate discount percentage
getDiscountPercentage(originalPrice, currentPrice) -> number
```

---

## 📊 Data Flow

### Adding to Cart
```
ProductCard.handleAddToCart()
  ↓
addToCart(product, quantity)  // Utils
  ↓
saveCartToLocalStorage(cart)
  ↓
onAddToCart callback (Props)
  ↓
App.handleAddToCart()
  ↓
setCartCount(getCartItemCount())
  ↓
Header receives updated cartCount
```

### Filtering Products
```
Products.handleCategoryChange()
  ↓
setSelectedCategory(category)
  ↓
useMemo recalculates filteredProducts
  ↓
Products grid re-renders with new products
```

### Checkout Process
```
Cart.handleCheckout()
  ↓
Validate form data
  ↓
clearCart()  // Utils
  ↓
setOrderPlaced(true)
  ↓
Show success message
  ↓
Redirect to home after 3s
```

---

## 🔄 Props Validation

All components use PropTypes:

```javascript
import PropTypes from 'prop-types';

Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  prop3: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

Component.defaultProps = {
  prop2: 0
};
```

---

## 🎯 Component Best Practices Used

✅ **Single Responsibility:** Each component does one thing
✅ **Props Validation:** PropTypes on all components  
✅ **Meaningful Names:** Clear, descriptive component names
✅ **Reusability:** Components designed to be reused
✅ **Composition:** Components composed from smaller components
✅ **Documentation:** Inline comments explaining logic
✅ **Error Handling:** Try-catch blocks in utilities
✅ **Performance:** useMemo for expensive calculations
✅ **Accessibility:** ARIA labels and semantic HTML

---

## 🚀 Extending Components

### Add a New Component
```javascript
// 1. Create component
// src/components/NewComponent.jsx
const NewComponent = ({ prop1, prop2 }) => {
  return <div>{/* JSX */}</div>;
};

// 2. Add PropTypes
NewComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func.isRequired
};

// 3. Create styles
// src/styles/NewComponent.css
.new-component { /* styles */ }

// 4. Import in parent
import NewComponent from '../components/NewComponent';

// 5. Use in JSX
<NewComponent prop1="value" prop2={callback} />
```

### Add a New Page
```javascript
// 1. Create page component
// src/pages/NewPage.jsx

// 2. Create styles
// src/styles/NewPage.css

// 3. Add route in App.jsx
<Route path="/newpage" element={<NewPage />} />

// 4. Add navigation link
<Link to="/newpage">New Page</Link>
```

---

## 📚 Component Communication Patterns

**Props Down:**
```jsx
<Header cartCount={cartCount} />
```

**Callbacks Up:**
```jsx
<ProductCard onAddToCart={handleAddToCart} />
```

**State Lifting:**
```jsx
// Parent manages state
const [selectedCategory, setSelectedCategory] = useState();

// Pass to child
<Filters 
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>
```

**localStorage Persistence:**
```jsx
useEffect(() => {
  const data = getCartFromLocalStorage();
  setCartItems(data);
}, []);
```

---

**Happy component building! 🎨**
