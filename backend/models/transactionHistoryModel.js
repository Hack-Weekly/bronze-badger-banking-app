const mongoose = require('mongoose');

const transactionHistorySchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  scheduled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdraw', 'transfer'], // Define the allowed transaction types
    required: true,
  },
});

module.exports = mongoose.model('TransactionHistory', transactionHistorySchema);