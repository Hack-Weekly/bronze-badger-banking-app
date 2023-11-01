const TransactionHistory = require('../models/transactionHistoryModel');
const Account = require('../models/accountModel');

const getTransactionHistory = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find all accounts associated with the user
        const accounts = await Account.find({ owner: userId });

        // Extract account IDs
        const accountIds = accounts.map(account => account._id);

        // Find transactions where either fromAccount or toAccount is in accountIds
        const transactions = await TransactionHistory.find({
            $or: [
                { fromAccount: { $in: accountIds } },
                { toAccount: { $in: accountIds } }
            ]
        }).populate('fromAccount').populate('toAccount').select('type');

        res.json({ success: true, transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching transaction history.' });
    }
};

module.exports = {
  getTransactionHistory
};