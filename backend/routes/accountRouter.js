const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const verifyUser = require('../utils/validators')
const {createAccount} = require('../controllers/accountController');

// Create account route
router.post('/create-account', createAccount);

module.exports = router;