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
});

module.exports = mongoose.model('TransactionHistory', transactionHistorySchema);