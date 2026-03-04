const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const rateLimiter = require('../middlewares/rateLimiter');

// CORS should be applied before other middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://expense-tracker-syn.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.json({ limit: '100kb' }));

const authRoutes = require('../routes/auth.router.js');
const transactionRoutes = require('../routes/transaction.routes.js');

app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;