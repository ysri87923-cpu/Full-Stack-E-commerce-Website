# Shopora — Full-Stack E-commerce Catalog Capstone

A responsive product catalog built with **React + Vite + React Router** and a **Node.js + Express REST API**. It is designed as a student portfolio project and can be deployed as one service on Render.

## Features

- Modular React structure: components, pages, context and styles are separated.
- Client-side routing: Home, Product Details, Cart and Not Found pages.
- Express REST API:
  - `GET /api/health`
  - `GET /api/products?q=&category=&sort=`
  - `GET /api/products/:id`
- Product search, category filtering and sorting.
- Shopping bag with add, remove and quantity controls.
- Cart state saved in browser `localStorage`.
- Responsive mobile-first layout.
- Lazy-loaded product images, image sizing parameters, browser caching defaults and production Vite build.
- Accessible labels, semantic page structure, loading/error/empty states.
- No payment collection. This is a portfolio/demo storefront.

## Requirements

Install **Node.js 20 or newer**. Check installation:

```bash
node -v
npm -v
```

## Run on your computer

1. Extract the ZIP.
2. Open the `shopora-capstone` folder in VS Code.
3. Open Terminal → New Terminal.
4. Install dependencies:

```bash
npm install
```

5. Start the frontend and backend:

```bash
npm run dev
```

6. Open the Vite address shown in the terminal, usually:

```text
http://localhost:5173
```

The React app uses Vite's development proxy to send `/api` requests to Express on port `5000`.

## Production build test

```bash
npm run build
npm start
```

Open `http://localhost:5000`. The Express server serves the optimized `dist` frontend and the API from the same origin.

## Deploy on Render

This repository includes `render.yaml`.

1. Create a public GitHub repository named `shopora-capstone`.
2. Upload the contents of this project folder to the repository (the files inside the folder, not the ZIP itself).
3. Sign in to Render and choose **New → Blueprint**.
4. Connect your GitHub repository.
5. Render reads `render.yaml`, installs packages, builds the React app and starts the Express server.
6. After deployment finishes, open the public `.onrender.com` URL.
7. Check that `/api/health` returns a JSON status message.

If you create the service manually instead of using the Blueprint, use:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`

The first request after a free service has been idle may take a little time while it wakes up.

## Project structure

```text
shopora-capstone/
├── server/
│   ├── index.js
│   └── products.json
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ProductCard.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── ProductDetails.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── render.yaml
└── vite.config.js
```

## API examples

```text
GET /api/products
GET /api/products?q=watch
GET /api/products?category=Home
GET /api/products?sort=price-low
GET /api/products/p1
```

## Important notes

- Product data is stored in `server/products.json` for a simple capstone demonstration. It is not a production database.
- Cart data is saved in the visitor's browser, not on the server.
- Product photos are loaded from Unsplash, so an internet connection is required for those images.
- Checkout is intentionally a demo; no payment gateway or real orders are processed.
- Before presenting the project, replace the sample product data and add your own screenshots and project description.
