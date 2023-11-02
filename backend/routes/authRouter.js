const express = require('express');
const router = express.Router();
const {signupController, loginController, logoutController, getToken, getName} = require('../controllers/authController')
const userValidation = require('../middlewares/userValidation');
const checkIfEmailExists = require('../middlewares/emailExistsMiddleware.js')

//routers to handle authentications
router.post('/signup', checkIfEmailExists, userValidation, signupController);
router.post('/login', loginController)
router.get('/logout', logoutController); 
router.get('/get-token', getToken)
router.get('/get-name', getName)
  
module.exports = router;