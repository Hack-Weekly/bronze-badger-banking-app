const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        required: true,
        enum:['savings']
    },
    balance:{
        type:Number,
        default:0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    transactions:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Transaction'
    }
});


module.exports = mongoose.model('Account', AccountSchema);