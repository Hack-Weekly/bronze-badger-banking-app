const {parseUserIdFromAccessToken} = require('../utils/validators')
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

const payController = async (req, res, next) =>{
    try{
        const access_token = req.cookies.access_token;
        if (!access_token) {
            return res.status(401).json({ success: false, message: 'You are not logged in.' });
          }
        const { amount, email, message } = req.body;
        const receiverUser = await User.findOne({ email: email });
        const transaction = new Transaction({ 
            type:'transfer',
            amount: amount,
            sender: parseUserIdFromAccessToken(access_token),
            receiver: receiverUser._id
        });
        await transaction.save();
        res.status(201).json({ message: 'Payment successful' });
    }catch(error){
        console.error(error);
    res.status(500).json({ success: false, message: 'Payment error.' });
    }
}




module.exports = {payController};