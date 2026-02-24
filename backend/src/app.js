const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())

const authRoutes = require('../routes/auth.router.js');
const transactionRoutes = require('../routes/transaction.routes.js');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;