const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const verifyUser = require('../utils/validators')
const {payController} = require('../controllers/transferController');

// Create account route
router.post('/pay', payController);

module.exports = router;