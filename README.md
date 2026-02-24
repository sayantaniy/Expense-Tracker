Expense Tracker — Version 1

**Overview**
- **Project:** Expense Tracker — a simple full‑stack app to record, list and delete user expenses.
- **Purpose:** Personal finance tracking (backend + frontend) intended for learning and as a GitHub demo (Version 1).

**Tech Stack**
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, cookies.
- **Frontend:** React + Vite, Tailwind CSS, Axios, React Router.

**Features (high level)**
- **User auth:** register, login, logout (JWT stored in an HTTP cookie).
- **Transactions:** add a transaction, list recent transactions, delete a transaction.
- **Categories:** preset categories (Food, Transport, Shopping, Bills, etc.).
- **CORS & Cookies:** frontend served from `http://localhost:5173` is allowed; requests send cookies for auth.

**Repository layout (important parts)**
- **Backend:** `backend/` — server, routes, controllers, models and DB connector.
- **Frontend:** `frontend/` — React app, pages `Login`, `Register`, `Transaction` and shared components.

**Backend — Details & Endpoints**
- **Start:** `cd backend && npm install && npm start` (uses `npx nodemon server.js`).
- **Env variables (example `.env`):**
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — secret used to sign JWT tokens

- **Main endpoints** (base: `http://localhost:3000/api`):
  - **POST** `/auth/register` — register a new user. Body: `{ name, username, email, password }`. Returns user info and sets `token` cookie.
  - **POST** `/auth/login` — login existing user. Body: `{ username, email, password }` (the app accepts username or email). Sets `token` cookie on success.
  - **POST** `/auth/logout` — clears the `token` cookie.

  - **POST** `/transactions/add` — create a transaction (protected). Body: `{ amount:Number, category:String, description:String, date:Date? }`.
  - **GET** `/transactions/list` — list recent transactions (protected). Returns `{ transactions: [...] }` sorted newest first (limit 20).
  - **DELETE** `/transactions/delete/:id` — delete a transaction by id (protected).

- **Auth middleware:** `checkToken` reads `token` cookie, verifies JWT using `JWT_SECRET`, and attaches `req.user` (`{ id }`).

- **Models**
  - `User`: `{ name, username (unique), email (unique), password (hashed) }`.
  - `Transaction`: `{ userId, amount, category (enum), description, date }`.

**Frontend — Details & Usage**
- **Start:** `cd frontend && npm install && npm run dev` (Vite dev server at `http://localhost:5173`).
- **Pages / Components**
  - **Register:** sign up a new user; on success navigates to `/transactions`.
  - **Login:** accepts username or email + password and navigates to `/transactions` on success.
  - **Transaction:** add new transactions, view a table of recent transactions, and delete items. Uses Axios with `withCredentials: true` to send cookies.

**Client ↔ Server integration notes**
- The frontend calls the backend at `http://localhost:3000` (CORS configured). Cookies are used for session JWT.
- The transaction page uses preset categories and represents amounts in INR (₹) in UI.

**Quick local setup**
1. Start MongoDB (local or cloud) and set `MONGO_URI`.
2. Create a `.env` in `backend/` with at least:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/... 
JWT_SECRET=your_jwt_secret
```

3. Start backend:

```
cd backend
npm install
npm start
```

4. Start frontend:

```
cd frontend
npm install
npm run dev
```

**Notes, caveats & Next steps**
- This README documents Version 1 (demo) behaviour. Consider the following improvements:
  - Add tests and CI checks.
  - Harden auth (httpOnly cookie options, expiry, refresh tokens).
  - Validate inputs and add better error handling in the frontend.
  - Add pagination and filters for transactions.

**Contributing**
- Open an issue or submit a PR with improvements. Keep changes focused and add tests where applicable.

**License**
- MIT — feel free to reuse and adapt for personal or demo projects.
