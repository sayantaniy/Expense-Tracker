***Expense Tracker — Version 1.1***

**Overview**
- **Project:** Expense Tracker — a simple full‑stack app to record, list and delete user expenses.
- **Purpose:** Personal finance tracking (backend + frontend) intended for learning and as a GitHub demo.
- **Status:** Version 1.1 — Stable with CORS fixes, responsive mobile UI, and production-ready security configurations.

**Tech Stack**
- **Backend:** Node.js, Express 4.x, MongoDB (Mongoose), JWT auth, secure HTTP-only cookies, Helmet for security.
- **Frontend:** React 19, Vite, Tailwind CSS 4, Axios, React Router, fully responsive design (mobile-first).

**Features (high level)**
- **User auth:** register, login, logout (JWT stored in secure HTTP-only cookie with CSRF protection).
- **Transactions:** add a transaction, list recent transactions, delete a transaction.
- **Categories:** preset categories (Food, Transport, Shopping, Bills, Groceries, Health, Education, Entertainment, Travel, Investments, Salary, Business, EMI, Utilities, Rent, Other).
- **Responsive Design:** fully mobile-responsive UI with hamburger menu on mobile, card-based transaction display, and touch-friendly interfaces.
- **CORS & Cookies:** frontend from any dev port (`localhost:5173-5175`) or production; requests send cookies for authentication.
- **Security:** Helmet.js for HTTP headers, input sanitization via express-mongo-sanitize, bcrypt password hashing, rate limiting.

**Repository layout (important parts)**
- **Backend:** `backend/` — Node/Express server, RESTful routes, controllers, MongoDB models, middleware (auth, rate limiting, sanitization), DB connector.
- **Frontend:** `frontend/` — React application with Vite bundler, pages (`Home`, `Login`, `Register`, `Transaction`), reusable components (`Navbar`, `Herosection`, `Features`, `Footer`), responsive Tailwind styles.

**Backend — Details & Endpoints**
- **Start:** `cd backend && npm install && npm start` (uses `npx nodemon server.js`).
- **Version:** Express 4.x (for compatibility with express-mongo-sanitize and other middleware).
- **Env variables (example `.env`):**
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — secret used to sign JWT tokens
  - `NODE_ENV` — set to `production` for secure cookies in production

- **CORS Configuration:**
  - Development: allows `http://localhost:5173`, `http://localhost:5174`, `http://localhost:5175` and all fallback ports
  - Production: allows `https://expense-tracker-syn.vercel.app`
  - All requests allow credentials (cookies) and standard HTTP methods

- **Main endpoints** (base: `http://localhost:3000/api`):
  - **POST** `/auth/register` — register a new user. Body: `{ name, username, email, password }`. Returns user info and sets secure `token` cookie.
  - **POST** `/auth/login` — login existing user. Body: `{ username, email, password }` or `{ username, password }` (app auto-detects username vs email). Sets `token` cookie on success.
  - **POST** `/auth/logout` — clears the `token` cookie.

  - **POST** `/transactions/add` — create a transaction (auth required). Body: `{ amount:Number, category:String, description:String, date:Date? }`. Date defaults to now if omitted.
  - **GET** `/transactions/list` — list recent transactions (auth required). Returns `{ transactions: [...] }` sorted newest first (limit 20).
  - **DELETE** `/transactions/delete/:id` — delete a transaction by id (auth required, only owner can delete their own transaction).

- **Auth middleware:** `checkToken` reads `token` cookie, verifies JWT using `JWT_SECRET`, and attaches `req.user` object with user ID.
- **Security middleware:**  
  - Helmet.js — sets secure HTTP headers (CSP, X-Frame-Options, etc.)
  - express-mongo-sanitize — removes `$` and `.` from keys to prevent NoSQL injection
  - bcrypt — salted password hashing (10 rounds)
  - Rate limiting — max 100 requests per 15 minutes per IP

- **Models**
  - `User`: `{ name, username (unique), email (unique), password (bcrypt hashed) }`.
  - `Transaction`: `{ userId (ref User), amount, category (enum), description, date, timestamps }`.

- **Error handling:**
  - 400 — bad request (validation failures)
  - 401 — unauthorized (invalid credentials)
  - 403 — forbidden (missing/invalid token)
  - 404 — not found (user or transaction not found)
  - 409 — conflict (user already exists)
  - 500 — server error (logged to console)

**Frontend — Details & Usage**
- **Start:** `cd frontend && npm install && npm run dev` (Vite dev server at `http://localhost:5173` or next available port).
- **Build:** `npm run build` (optimized production bundle in `dist/` folder).
- **Lint:** `npm run lint` (ESLint checks for code quality).

- **Pages / Components:**
  - **Home (`/`):** Landing page with hero section, feature cards, navigation. Fully responsive with mobile menu.
  - **Register (`/register`):** Create account form with name, username, email, password. Mobile-optimized form layout. Responsive from mobile to desktop.
  - **Login (`/login`):** Flexible login accepting username or email. Auto-detects field type. Responsive form with focus states.
  - **Transaction (`/transactions`):** Protected route. 
    - **Desktop:** Sticky form on left (1 column), transaction table on right (2 columns)
    - **Mobile:** Form first, then transaction cards below (each transaction is a card, not a table row)
    - Add new transactions with amount, category dropdown, description, and date picker
    - View transaction history sorted by date (newest first)
    - Delete transactions with confirmation UI

- **Responsive Components:**
  - **Navbar:** Desktop links in header, mobile hamburger menu that toggles visibility
  - **Hero Section:** Responsive heading sizes (text-3xl mobile → text-5xl desktop)
  - **Features:** Single column on mobile, 3 columns on desktop with hover effects
  - **Footer:** No longer fixed (allows content below), responsive padding
  - **Forms:** Responsive width, touch-friendly inputs with focus ring styling
  - **Transaction Table:** Table on desktop, card layout on mobile for better readability

- **Styling & UX:**
  - Tailwind CSS 4 with custom color palette: Orange (#FF7F11), Sage (#ACBFA4), Black (#262626)
  - Custom fonts: JetBrains Mono, Lexend, and others from Google Fonts
  - Smooth transitions and hover effects for interactive elements
  - User feedback: loading states, error messages, success indicators
  - Touch-optimized button sizes and spacing for mobile

- **API Integration:**
  - Axios with `withCredentials: true` for secure cookie handling
  - Auto-detects API base URL from environment (`VITE_API_BASE_URL`)
  - Error handling with user-friendly messages
  - Loading indicators during async operations

**Client ↔ Server integration notes**
- The frontend calls the backend at `http://localhost:3000` during development (via `VITE_API_BASE_URL` env variable).
- **CORS:** Properly configured and tested with preflight OPTIONS requests. Supports multiple dev ports and production domains.
- **Cookies:** JWT tokens stored in HTTP-only, Secure, SameSite=Strict cookies. Automatically sent by browser via `withCredentials: true`.
- **Error Handling:** 4xx errors show user-friendly messages; 5xx errors are logged and displayed generically.
- **Transaction UI:** Desktop shows responsive table; mobile shows card-based list for optimal readability on small screens.
- **Amounts:** Displayed in INR (₹) currency format with 2 decimal places.

**Quick local setup**
1. **Clone the repository:**
   ```
   git clone <repo-url>
   cd expense-tracker
   ```

2. **Set up MongoDB:**
   - Local: Start MongoDB service (e.g., `brew services start mongodb-community` on macOS)
   - Cloud: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

3. **Backend setup:**
   ```
   cd backend
   npm install
   ```
   Create `.env` file:
   ```
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster/ExpenseTracker
   JWT_SECRET=your_random_jwt_secret_here_use_at_least_32_chars
   NODE_ENV=development
   ```
   Start server:
   ```
   npm start
   ```
   Server runs on `http://localhost:3000`

4. **Frontend setup:**
   ```
   cd frontend
   npm install
   ```
   The `.env` file already has `VITE_API_BASE_URL=http://localhost:3000` configured.
   Start dev server:
   ```
   npm run dev
   ```
   Visit `http://localhost:5173` (or next available port) in your browser

5. **Test the app:**
   - Visit home page (`/`)
   - Register a new account
   - Add some sample transactions
   - Test on mobile/tablet viewport (browser DevTools)
   - Delete transactions
   - Logout and login again

**Version History & Known Issues**
- **v1.1 (Current):**
  - ✅ Fixed CORS configuration for all dev and production origins
  - ✅ Downgraded Express to 4.x for middleware compatibility
  - ✅ Added full mobile responsiveness with hamburger menu and card-based layouts
  - ✅ Enhanced security with Helmet, input sanitization, and bcrypt
  - ✅ Improved error handling and user feedback
  - ✅ Added rate limiting (100 requests per 15 minutes)
  
- **v1.0 (Initial):**
  - Basic CRUD for transactions
  - JWT authentication with cookies

**Known Limitations & Future Improvements**
- **Testing:** No automated tests yet. Consider adding Jest (backend) and Vitest (frontend).
- **Auth hardening:** Implement refresh tokens for longer sessions, token rotation, or OAuth integrations.
- **Input validation:** Add field validation (email format, password strength, min/max lengths).
- **Pagination:** Transaction lists currently limited to 20 items. Add pagination or infinite scroll.
- **Filtering & Sorting:** Allow users to filter by category/date range and sort transactions.
- **Analytics:** Add charts/graphs for spending trends (category breakdown, monthly summary).
- **Notifications:** Add toast notifications or email alerts.
- **Multi-user support:** Currently no user profiles or account settings.
- **Offline mode:** Consider service workers for offline access to cached transactions.
- **Performance:** Optimize bundle size, add code splitting, lazy load routes.
- **Database indexing:** Add indexes on frequently queried fields (userId, date, category).

**Production Deployment Checklist**
- [ ] Set `NODE_ENV=production` on server
- [ ] Use strong `JWT_SECRET` (randomly generated, min 32 chars)
- [ ] Enable HTTPS/TLS on production domain
- [ ] Set `secure: true` for cookies (already conditional on NODE_ENV)
- [ ] Configure rate limiting limits for production traffic
- [ ] Set up MongoDB backups and monitoring
- [ ] Add request logging and error monitoring (e.g., Sentry, LogRocket)
- [ ] Configure proper CORS origins for production domain only
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Set up CI/CD pipeline (GitHub Actions, etc.)
- [ ] Regular security updates for dependencies (`npm audit fix`)

**Contributing**
- Fork the repository and create a feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request with a clear description
- Ensure all tests pass and code follows the project style
- Keep changes focused and related to one feature per PR

**Bug Reports & Feature Requests**
- Use GitHub Issues to report bugs or suggest features
- Provide clear reproduction steps for bugs
- Include screenshots/videos for UI issues
- Label issues appropriately (bug, enhancement, documentation, etc.)

**Code Style**
- Backend: Standard Node.js/Express conventions (camelCase, 2-space indents)
- Frontend: ESLint configured; run `npm run lint` before committing
- Commit messages: Use present tense ("Add feature" not "Added feature")

**Author**
- Sayantani Manna 
