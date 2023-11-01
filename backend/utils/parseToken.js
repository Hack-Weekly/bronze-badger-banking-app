const User = require('../models/userModel');

async function parseEmailFromUserID(userId) {
    try {
        //console.log(userId)
        const user = await User.findOne({_id: userId});

        if (user){
            return user.email;
        } else {
            throw new Error('User ID not found');
          }
    } catch (error) {
      throw new Error('Invalid id');
    }
  }

  module.exports = { parseEmailFromUserID };