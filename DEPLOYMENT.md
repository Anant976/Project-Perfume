# Deployment Guide for Essence Perfumery

This guide covers multiple deployment options for your React e-commerce application.

## 🚀 Quick Start - Local Development

```bash
cd Project1
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Building for Production

Before deploying, build the optimized production version:

```bash
npm run build
```

This creates a `dist/` folder with optimized, minified files.

---

## 🌐 Deployment Platforms

### ⭐ **Vercel (Easiest)**

Best for: Fastest setup, automatic deployments, best performance

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy from project directory:
   ```bash
   vercel
   ```
4. Follow prompts and select `dist` as build output
5. Your site is live!

**Auto-deployment from GitHub:**
1. Push code to GitHub
2. In Vercel dashboard, connect GitHub
3. Select repository
4. Vercel auto-deploys on every push

### 📱 **Netlify**

Best for: Great UX, excellent documentation

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Method 1 - Drag & Drop:
   - Build locally: `npm run build`
   - Drag the `dist` folder onto Netlify
   
3. Method 2 - Git Connection:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

**Using Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 🐙 **GitHub Pages**

Best for: Free hosting with GitHub

**Steps:**
1. Add homepage to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/perfume-ecommerce"
   ```

2. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. In GitHub repo settings, set source to `gh-pages` branch

**Site URL:** `https://yourusername.github.io/perfume-ecommerce`

### ☁️ **AWS S3 + CloudFront**

Best for: Scalability, global CDN

**Steps:**
1. Create S3 bucket
2. Enable static website hosting
3. Set bucket policy for public access
4. Upload `dist` contents
5. Create CloudFront distribution
6. Point domain to CloudFront

### 🔵 **DigitalOcean App Platform**

Best for: Affordable, reliable hosting

**Steps:**
1. Create account at [digitalocean.com](https://digitalocean.com)
2. Create new App
3. Connect GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

### 🦊 **Firebase Hosting**

Best for: Google ecosystem integration

**Steps:**
1. Create project at [firebase.google.com](https://firebase.google.com)
2. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
3. Initialize Firebase:
   ```bash
   firebase login
   firebase init hosting
   ```
4. Set public directory to `dist`
5. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

### 🟢 **Heroku**

**Note:** Heroku removed free tier in November 2022

Best for: Adding backend services

**Steps:**
1. Create account at [heroku.com](https://heroku.com)
2. Create `Procfile`:
   ```
   web: npm run build && npm start
   ```
3. Deploy using Git or Heroku CLI

### 🐳 **Docker + Any Server**

For advanced deployment scenarios:

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and push:
```bash
docker build -t perfume-ecommerce .
docker push yourusername/perfume-ecommerce
```

---

## 📋 Pre-Deployment Checklist

- [ ] Build runs without errors: `npm run build`
- [ ] All pages work correctly
- [ ] Cart functionality tested
- [ ] Mobile responsive tested
- [ ] No console errors
- [ ] Images load correctly
- [ ] Links work correctly
- [ ] Forms validate properly
- [ ] Performance optimized
- [ ] Accessibility tested

---

## 🔧 Environment Variables

Create `.env` file for sensitive data (never commit):

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Essence Perfumery
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🚨 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
- Check Node version: `node --version` (should be 14+)
- Clear npm cache: `npm cache clean --force`
- Rebuild: `npm run build`

### Router not working after deployment
Ensure your hosting platform serves `index.html` for all routes:

**Vercel:** Automatic ✓
**Netlify:** Automatic ✓
**GitHub Pages:** Add `_redirects` file

```
/* /index.html 200
```

**S3 + CloudFront:** Set error document to `index.html`

### Images not loading
- Check image paths start with `/`
- Update image URLs to full CDN paths if needed
- Verify CORS settings

---

## 📊 Performance Tips

1. **Lazy load images:**
   ```jsx
   <img src="..." loading="lazy" />
   ```

2. **Code splitting with React.lazy():**
   ```jsx
   const Products = React.lazy(() => import('./pages/Products'));
   ```

3. **Cache assets:**
   - Enable browser caching
   - Use CDN for static files
   - Minify CSS/JS (Vite does this)

4. **Monitor performance:**
   - Use Lighthouse
   - Check Web Vitals
   - Monitor analytics

---

## 🔐 Security Best Practices

- ✓ Never commit `.env` files
- ✓ Use HTTPS only
- ✓ Validate user input
- ✓ Sanitize output to prevent XSS
- ✓ Use secure headers
- ✓ Regular dependency updates: `npm audit fix`
- ✓ Enable CORS properly

---

## 📈 Analytics

Add Google Analytics:

```jsx
// Add to main.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useGoogleAnalytics() {
  const location = useLocation();
  useEffect(() => {
    window.gtag?.('pageview', {
      page_path: location.pathname,
    });
  }, [location]);
}
```

---

## 🎯 Recommended Setup

For best results:
1. Use **Vercel** or **Netlify** for ease
2. Connect **GitHub** for auto-deployments
3. Use **custom domain** for professional look
4. Enable **SSL/HTTPS** (automatic on Vercel/Netlify)
5. Monitor with **Sentry** for error tracking
6. Use **Datadog** or similar for analytics

---

## 📞 Need Help?

- Check platform-specific documentation
- Review logs on deployment platform
- Test locally: `npm run preview`
- Clear browser cache
- Try incognito mode
- Check firewall/CORS settings

---

**Happy deploying! 🚀**
