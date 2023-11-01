const Account = require('../models/accountModel');
const jwt = require('jsonwebtoken');
const {parseUserIdFromAccessToken} = require('../utils/validators')

const generateAccountNumber = () => {
    // Generate a random 8-digit number
    const randomAccountNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomAccountNumber.toString();
  };

const createAccount = async (req, res) => {
    const { accountType, accountName } = req.body;
    const access_token = req.cookies.access_token;
    if (!access_token) {
      return res.status(401).json({ success: false, message: 'You are not logged in.' });
    }

    const owner = parseUserIdFromAccessToken(access_token);
    const transactionLimit = 500;
  
    try {
      const accountNumber = generateAccountNumber();
  
      const newAccount = new Account({
        accountNumber,
        accountName,
        accountType,
        transactionLimit,
        owner,
      });

    await newAccount.save();

    res.json({ success: true, message: 'Account created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the account.' });
  }
};

module.exports = {
  createAccount,
  parseUserIdFromAccessToken
};
