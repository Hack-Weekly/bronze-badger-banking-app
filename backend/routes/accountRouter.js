const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const {createAccount} = require('../controllers/accountController');

// Create account route
router.post('/create-account', isAuthenticated, createAccount);

module.exports = router;