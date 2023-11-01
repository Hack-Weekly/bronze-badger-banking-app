const TransactionHistory = require('../models/transactionHistoryModel');

const getTransactionHistory = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming user ID is attached to the request object

    // Find transaction history for the logged-in user
    const transactions = await TransactionHistory.find({
      $or: [{ fromAccount: userId }, { toAccount: userId }]
    }).populate('fromAccount').populate('toAccount');

    res.json({ success: true, transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching transaction history.' });
  }
};

module.exports = {
  getTransactionHistory
};