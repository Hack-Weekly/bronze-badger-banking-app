const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const verifyUser = require('../utils/validators')
const {getTransactionHistory} = require('../controllers/transactionHistoryController');
const {deposit} = require('../controllers/depositController');

// Create account route
router.get('/transaction-history', isAuthenticated, getTransactionHistory);

// Deposit route
router.post('/deposit/:accountID', isAuthenticated, deposit);


module.exports = router;