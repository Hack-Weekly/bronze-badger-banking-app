const User = require('../models/userModel');

//function to register user
const signupController = async(req, res)=> {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        next(error); // Pass the error to the error handling middleware
    }
}
module.exports = {signupController};