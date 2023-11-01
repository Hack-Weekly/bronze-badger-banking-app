const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const {payController} = require('../controllers/transferController');
const {parseEmailFromUserID} = require('../utils/parseToken');

// Create account route
router.post('/pay', payController);
router.get('/getEmail', async (req, res) => {
    try {
      const userId = req.query.userId;
  
      const email = await parseEmailFromUserID(userId);
  
      res.json({ email });
    } catch (error) {
      console.error('Error fetching user email:', error);
      res.status(500).json({ error: 'An error occurred while fetching user email' });
    }
  });
module.exports = router;