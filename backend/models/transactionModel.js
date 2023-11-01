const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    type: {
        type:String,
        required:true,
        enum:['deposit','withdraw','transfer']
    },
    amount:{
        type:Number,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },
    date:{
        type:Date,
        default:Date.now
    },
    scheduled: {
        type: Boolean,
        default: false,
      }
});

module.exports = mongoose.model('Transaction', TransactionSchema);