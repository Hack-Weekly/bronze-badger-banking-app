const Transaction = require('../models/transactionModel');

const getTransactionHistory = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const transactions = await Transaction.find({
            $or: [
                { sender:  userId  },
                { receiver:  userId  }
            ]
        })
        .select('sender receiver type amount date');
        
        res.json({ success: true, transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching transaction history.' });
    }
};

module.exports = {
  getTransactionHistory
};