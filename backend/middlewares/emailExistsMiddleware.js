const User = require('../models/userModel');

const checkIfEmailExists = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const error = new Error('Email already exists');
            error.statusCode = 400;
            throw error; // This will trigger the error handling middleware
        }

        next(); // Proceed to the next middleware if email doesn't exist
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};

module.exports = checkIfEmailExists;