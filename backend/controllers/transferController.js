const {parseUserIdFromAccessToken} = require('../utils/validators')
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')
const Account = require('../models/accountModel')

const payController = async (req, res, next) =>{
    try{
        const access_token = req.cookies.access_token;
        if (!access_token) {
            return res.status(401).json({ success: false, message: 'You are not logged in.' });
          }
        const sender = parseUserIdFromAccessToken(access_token);
        const { amount, email, message } = req.body;
        const receiverUser = await User.findOne({ email: email });
        if (!receiverUser) {
            return res.status(404).json({ success: false, message: 'Receiver not found.' });
          }


          const senderCheckingAccount = await Account.findOne({
            owner: sender,
            accountType: 'chequeing',
          });
          const receiverSavingsAccount = await Account.findOne({
            owner: receiverUser._id,
            accountType: 'savings',
          });

          if (!senderCheckingAccount || !receiverSavingsAccount) {
            return res.status(400).json({ success: false, message: 'Invalid account(s).' });
          }
          if (senderCheckingAccount.balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient balance.' });
          }
          senderCheckingAccount.balance -= amount;
          await senderCheckingAccount.save();

          receiverSavingsAccount.balance += amount;
          await receiverSavingsAccount.save();

        //save record of transaction
        const transaction = new Transaction({ 
            type:'transfer',
            amount: amount,
            sender: sender,
            receiver: receiverUser._id
        });
        await transaction.save();
        
        /*
          // Save transaction in transaction history
        const transactionHistory = new TransactionHistory({
            fromAccount: senderCheckingAccount._id,
            toAccount: receiverSavingsAccount._id,
            amount,
            type: 'transfer'
        });
        await transactionHistory.save();
        */
        res.status(201).json({ transaction });
    }catch(error){
        console.error(error);
    res.status(500).json({ success: false, message: 'Payment error.' });
    }
}




module.exports = {payController};