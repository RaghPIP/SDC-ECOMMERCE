# E-Commerce Product Page MVP

Phase 3 implementation of an e-commerce product detail experience using a Vite + React + Tailwind frontend and a Node + Express backend.

## Project Structure
- `frontend/` — Vite React SPA with Tailwind CSS styling; consumes the product API.
- `backend/` — Express server that exposes `/api/product` and `/health` endpoints.

## Prerequisites
- Node.js 20+

## Run the Backend API
1. `cd backend`
2. `npm install`
3. `npm run dev` (or `npm start` for production mode)
4. The API is available at `http://localhost:5000/api/product`

## Run the Frontend
1. In a new terminal, `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open the Vite dev server URL (default `http://localhost:5173`)

The frontend is configured to proxy `/api/*` requests to the backend during development. For external deployments, set `VITE_API_URL` to the backend base URL before building.

## App Usage
- Landing page lists multiple products from `/api/products`. Click a card to open the product page.
- Product page shows gallery, details, and lets you add to cart.
- Cart page (`/cart`) supports increment, decrement, remove, and checkout; checkout hits `/api/checkout`.

## Next Steps
- Phase 4: add cart persistence, authentication, related products, and CI/CD pipeline.
- Phase 5: prepare walkthrough demo, deployment scripts, and documentation bundles.

