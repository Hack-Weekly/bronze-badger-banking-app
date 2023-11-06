const Transaction = require('../models/transactionModel')
// const User = require('../models/userModel')
const Account = require('../models/accountModel');
const TransactionHistory = require('../models/transactionHistoryModel');

const deposit = async (req, res, next) => {
  try {
    const {accountID} = req.params;
    const amount = parseFloat(req.body.amount);
    const userId = req.user._id;
    console.log(req.body.amount)

    const account = await Account.findOne({ owner: userId, _id: accountID });

    if (!account) {
      return res.status(404).json({ success: false, message: 'Savings account not found.' });
    }

    // Create a deposit transaction
    const newTransaction = new Transaction({
      type: 'deposit',
      amount,
      sender: account._id,
      receiver: account._id, // Since it's a deposit, sender and receiver are the same
    });

    await newTransaction.save();
    const transactionHistory = new TransactionHistory({
        fromAccount: account._id,
        toAccount: account._id,
        amount,
        type: 'deposit',
    });

    await transactionHistory.save();
    // Update account balance
    account.balance += amount;
    await account.save();

    res.json({ success: true, message: 'Deposit transaction created successfully.', account });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the deposit transaction.' });
  }
};

module.exports = {
  deposit
};