# React Concepts Learning Guide

This document explains how each React concept is implemented in the Essence Perfumery e-commerce application.

---

## 📚 Table of Contents

1. React JSX
2. React Components (Component API, Constructors)
3. React Dataflow (State, Props, Props Validation)
4. Styling in React
5. Hooks and Routing
6. Deploying React Applications
7. HTML, JavaScript, CSS

---

## 1. 📝 React JSX

### What is JSX?
JSX is a syntax extension to JavaScript that looks like HTML. It gets compiled to JavaScript function calls.

### Implementation in Project

**Example: ProductCard Component**
```jsx
// src/components/ProductCard.jsx
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
        {discountPercentage > 0 && (
          <div className="discount-badge">{discountPercentage}% OFF</div>
        )}
      </div>
      
      <button onClick={handleAddToCart}>Add to Cart</button>
    </article>
  );
};
```

### Key JSX Features Used:
- **HTML-like syntax**: Tags for DOM elements
- **Expressions in {}**: `{discountPercentage > 0}`
- **Conditional rendering**: `{condition && <JSX />}`
- **Attributes**: Maps to DOM properties
- **Children**: Nested JSX elements

### Compilation:
JSX compiles to:
```javascript
React.createElement('article', { className: 'product-card' },
  React.createElement('div', { className: 'product-image-container' },
    // ... children
  )
)
```

---

## 2. 🏗️ React Components (Component API, Constructors)

### Types of Components

#### Functional Components (Used in this project)
```jsx
function Header(props) {
  return <header>{/* JSX */}</header>;
}
```

#### Arrow Function Components
```jsx
const Header = (props) => {
  return <header>{/* JSX */}</header>;
};
```

#### Class Components (Legacy)
```jsx
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
  }
  
  render() {
    return <header>{/* JSX */}</header>;
  }
}
```

### Implementation in Project

**App.jsx - Main Component**
```jsx
function App() {
  const [cartCount, setCartCount] = React.useState(0);
  
  useEffect(() => {
    updateCartCount();
  }, []);
  
  return (
    <Router>
      <Header cartCount={cartCount} />
      <Routes>
        {/* Route definitions */}
      </Routes>
      <Footer />
    </Router>
  );
}
```

**Header.jsx - Functional Component with Hooks**
```jsx
const Header = ({ cartCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  return (
    <header className="header">
      {/* Navigation JSX */}
    </header>
  );
};
```

### Component Lifecycle (Functional Components)

| Lifecycle | Hook | Usage |
|-----------|------|-------|
| Mount | useEffect(() => {}, []) | Initialize, fetch data |
| Update | useEffect(() => {}, [deps]) | React to prop/state changes |
| Unmount | useEffect(() => () => {}, []) | Cleanup |

**Example from Cart.jsx:**
```jsx
useEffect(() => {
  const cart = getCartFromLocalStorage();
  setCartItems(cart);
}, []); // Runs once on mount
```

### Component Composition

```jsx
// Parent Component
<Header cartCount={cartCount} />

// Breaks down into:
<div className="header">
  <div className="logo">...</div>
  <nav className="nav">...</nav>
  <a className="cart-link">...</a>
</div>
```

---

## 3. 📊 React Dataflow (State, Props, Props Validation)

### Props (Parent → Child Communication)

**Passing Props:**
```jsx
// Parent (App.jsx)
<ProductCard product={product} onAddToCart={handleAddToCart} />

// Child (ProductCard.jsx)
const ProductCard = ({ product, onAddToCart }) => {
  // Use product and onAddToCart
};
```

**Props Validation with PropTypes**

```jsx
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart }) => {
  // Component logic
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

ProductCard.defaultProps = {
  rating: 0
};
```

### State Management

**useState Hook:**
```jsx
const [quantity, setQuantity] = useState(1);
const [cartItems, setCartItems] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('All Products');

// Update state
setQuantity(quantity + 1);
setCartItems([...cartItems, newItem]);
```

**Example from ProductDetails.jsx:**
```jsx
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  
  const handleQuantityChange = (value) => {
    if (value > 0 && value < 100) {
      setQuantity(value);
    }
  };
  
  return (
    <input 
      value={quantity}
      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
    />
  );
};
```

### State Lifting (Child → Parent)

```jsx
// Parent (App.jsx)
const [cartCount, setCartCount] = useState(0);

const handleAddToCart = (product) => {
  addToCart(product);
  setCartCount(getCartItemCount());
};

// Pass as prop to child
<ProductCard onAddToCart={handleAddToCart} />

// Child (ProductCard.jsx)
const ProductCard = ({ onAddToCart }) => {
  return (
    <button onClick={() => onAddToCart(product)}>
      Add to Cart
    </button>
  );
};
```

### LocalStorage for Persistence

```jsx
// utils/cartUtils.js
export const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("perfume_cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

export const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("perfume_cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

// Used in Cart.jsx
useEffect(() => {
  const cart = getCartFromLocalStorage();
  setCartItems(cart);
}, []);
```

### Data Flow Diagram

```
App (State: cartCount, cartItems)
  ↓
  ├── Header (Props: cartCount)
  │    ↓ Updates cartCount via callback
  │
  ├── Products (Props: onAddToCart callback)
  │    ↓
  │    └── ProductCard (Props: product, onAddToCart)
  │         ↓ Calls onAddToCart when button clicked
  │
  ├── ProductDetails
  │    ↓ State: quantity, notificationMessage
  │    ↓ Updates via button click
  │
  ├── Cart (State: cartItems from localStorage)
  │    ↓
  │    └── CartItem (Props: item, onRemove, onQuantityChange)
  │
  └── Footer
```

---

## 4. 🎨 Styling in React

### CSS Approaches Used in Project

#### 1. **CSS Files (Primary Method)**
```jsx
// Component
import '../styles/ProductCard.css';

const ProductCard = () => (
  <article className="product-card">
    {/* JSX */}
  </article>
);
```

```css
/* styles/ProductCard.css */
.product-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

#### 2. **CSS Variables (Global Theming)**
```css
/* styles/index.css */
:root {
  --primary-color: #9333ea;
  --secondary-color: #ec4899;
  --accent-color: #f59e0b;
  --dark-color: #1f2937;
}

.button {
  background-color: var(--primary-color);
  color: white;
}
```

#### 3. **Inline Styles (When Necessary)**
```jsx
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav style={{
      display: isOpen ? 'flex' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* Navigation */}
    </nav>
  );
};
```

#### 4. **CSS Grid & Flexbox**

**CSS Grid Example:**
```css
/* styles/Products.css */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
```

**Flexbox Example:**
```css
/* styles/Header.css */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
```

#### 5. **Responsive Design**

```css
/* Mobile First Approach */
.product-card {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .product-card {
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .product-card {
    padding: 2rem;
  }
}
```

#### 6. **CSS Animations**

```css
/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.notification {
  animation: fadeIn 0.3s ease;
}

/* Slide in animation */
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Styling Organization

```
src/styles/
├── index.css          # Global styles, variables
├── App.css           # App layout
├── Header.css        # Header styling
├── ProductCard.css   # Product card styling
├── Cart.css          # Cart page styling
└── ...              # Other component styles
```

---

## 5. 🪝 Hooks and Routing

### React Hooks

#### useState
```jsx
// Simple state
const [quantity, setQuantity] = useState(1);

// Object state
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: ''
});

// Update object
setFormData(prev => ({
  ...prev,
  firstName: 'John'
}));
```

**Used in: ProductCard.jsx, Cart.jsx, Products.jsx, Contact.jsx**

#### useEffect
```jsx
// Run once on mount
useEffect(() => {
  const cart = getCartFromLocalStorage();
  setCartItems(cart);
}, []);

// Run when dependencies change
useEffect(() => {
  updateCartCount();
}, [cartItems]);

// Cleanup
useEffect(() => {
  const timer = setTimeout(() => {
    setNotification('');
  }, 2000);
  
  return () => clearTimeout(timer);
}, []);
```

**Used in: App.jsx, Cart.jsx, Contact.jsx**

#### useMemo
```jsx
// Memoize expensive calculations
const filteredProducts = useMemo(() => {
  let filtered = getProductsByCategory(selectedCategory);
  
  if (priceRange.min) {
    filtered = filtered.filter(p => p.price >= parseFloat(priceRange.min));
  }
  
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered;
}, [selectedCategory, priceRange, searchTerm]);
```

**Used in: Products.jsx**

#### useParams & useNavigate (React Router Hooks)
```jsx
// Get route parameters
const { id } = useParams();
const product = getProductById(parseInt(id, 10));

// Navigate programmatically
const navigate = useNavigate();
navigate('/products');
navigate(-1); // Go back
```

**Used in: ProductDetails.jsx**

#### useSearchParams
```jsx
// Get query parameters
const [searchParams] = useSearchParams();
const initialCategory = searchParams.get('category') || 'All Products';
```

**Used in: Products.jsx**

### React Router

#### Setup (App.jsx)
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
```

#### Navigation
```jsx
import { Link, useNavigate } from 'react-router-dom';

// Link component (client-side)
<Link to="/products">Shop</Link>
<Link to={`/product/${product.id}`}>View Details</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/products');
navigate(-1);
```

**Used throughout the application for page navigation**

#### Route Parameters
```jsx
// URL: /product/5
<Route path="/product/:id" element={<ProductDetails />} />

// Access in component
const { id } = useParams();
```

#### Query Parameters
```jsx
// URL: /products?category=Men
<Route path="/products" element={<Products />} />

// Access in component
const [searchParams] = useSearchParams();
const category = searchParams.get('category');
```

---

## 6. 🚀 Deploying React Applications

### Build Process

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Optimize and bundle
npm run preview      # Preview production build locally
```

### Build Output
```
dist/
├── index.html      # Entry HTML
├── assets/
│   ├── *.js        # JavaScript bundles
│   ├── *.css       # CSS bundles
│   └── *.png       # Images, etc.
└── vite.svg        # Static assets
```

### Deployment Steps (General)

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Test production build:**
   ```bash
   npm run preview
   ```

3. **Deploy `dist/` folder** to hosting

4. **Configure server** to serve `index.html` for all routes

### Platform-Specific Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- DigitalOcean
- Firebase
- Docker

### Environment Variables
```bash
# .env file
VITE_API_URL=https://api.example.com

# Access in code
import.meta.env.VITE_API_URL
```

### Performance Optimization

**Code Splitting:**
```jsx
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));

<Suspense fallback={<Loading />}>
  <ProductDetails />
</Suspense>
```

**Image Optimization:**
```jsx
<img src="..." loading="lazy" alt="..." />
```

**Memoization:**
```jsx
const ProductCard = React.memo(({ product }) => {
  return <article>{/* ... */}</article>;
});
```

---

## 7. 🌐 HTML, JavaScript, CSS

### HTML (public/index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="..." />
    <title>Essence Perfumery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### JavaScript (Vanilla JS Functions)

**Product Utilities (utils/products.js):**
```javascript
export const getProductsByCategory = (category) => {
  if (category === "All Products" || !category) {
    return products;
  }
  return products.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
```

**Cart Utilities (utils/cartUtils.js):**
```javascript
export const addToCart = (product, quantity = 1) => {
  const cart = getCartFromLocalStorage();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCartToLocalStorage(cart);
  return cart;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
};
```

### CSS Best Practices

**Color Variables:**
```css
:root {
  --primary-color: #9333ea;
  --secondary-color: #ec4899;
  --success-color: #10b981;
  --error-color: #ef4444;
}
```

**Responsive Breakpoints:**
```css
/* Mobile First */
/* Default: Mobile (0-479px) */
.container { padding: 1rem; }

/* Tablet (480-767px) */
@media (min-width: 480px) {
  .container { padding: 1.5rem; }
}

/* Large Tablet (768-1023px) */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container { padding: 3rem; }
}
```

**Flexbox Layout:**
```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
```

**Grid Layout:**
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
```

---

## 📖 Quick Reference

| Concept | File | Example |
|---------|------|---------|
| JSX | ProductCard.jsx | `<div>{product.name}</div>` |
| Components | Header.jsx | Functional component |
| Props | ProductCard.jsx | `const { product } = props` |
| PropTypes | ProductCard.jsx | `ProductCard.propTypes = {...}` |
| State | Cart.jsx | `const [cartItems, setCartItems] = useState([])` |
| useState | Products.jsx | `const [selectedCategory, setSelectedCategory] = useState()` |
| useEffect | App.jsx | `useEffect(() => {}, [])` |
| useMemo | Products.jsx | `useMemo(() => {...}, [deps])` |
| CSS Files | styles/ | `import '../styles/App.css'` |
| Responsive | ProductCard.css | `@media (max-width: 768px)` |
| Routing | App.jsx | `<Route path="/products" element={}` |
| useParams | ProductDetails.jsx | `const { id } = useParams()` |
| Link | Header.jsx | `<Link to="/cart">Cart</Link>` |

---

## 🎓 Learning Path

1. **Start with HTML/CSS/JS fundamentals**
   - Understand DOM, selectors, events
   - Practice layouts with flexbox/grid

2. **Learn React Basics**
   - Components and JSX
   - Props and state
   - Event handling

3. **Master Hooks**
   - useState for state
   - useEffect for side effects
   - Custom hooks

4. **Study Routing**
   - React Router setup
   - Navigation patterns
   - URL parameters

5. **Build Projects**
   - Start small (todo list)
   - Build medium (this e-commerce app)
   - Advanced features (auth, API)

6. **Learn Deployment**
   - Build optimization
   - Hosting platforms
   - Performance monitoring

---

**Happy Learning! 📚**
