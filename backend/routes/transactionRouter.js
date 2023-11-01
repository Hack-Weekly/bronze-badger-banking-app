const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const verifyUser = require('../utils/validators')
const {getTransactionHistory} = require('../controllers/transactionHistoryController');

// Create account route
router.get('/transaction-history', isAuthenticated, getTransactionHistory);

module.exports = router;