const Account = require('../models/accountModel');

const generateAccountNumber = () => {
    // Generate a random 8-digit number
    const randomAccountNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomAccountNumber.toString();
  };

const createAccount = async (req, res) => {
    const { accountType } = req.body;
    const owner = req.user.id;
  
    try {
      const accountNumber = generateAccountNumber();
  
      const newAccount = new Account({
        accountNumber,
        accountType,
        owner
      });

    await newAccount.save();

    res.json({ success: true, message: 'Account created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the account.' });
  }
};

module.exports = {
  createAccount
};
