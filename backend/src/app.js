const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.json())

const authRoutes = require('../routes/auth.router.js');
const transactionRoutes = require('../routes/transaction.routes.js');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;