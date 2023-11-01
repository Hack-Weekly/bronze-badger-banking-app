const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const verifyUser = require('../utils/validators')
const {createAccount, getUserAccounts} = require('../controllers/accountController');

// Get authenticated user's accounts route
router.get('/user-accounts', isAuthenticated, getUserAccounts);

// Create account route
router.post('/create-account', createAccount);



module.exports = router;