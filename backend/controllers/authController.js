const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//login
const loginController = async(req, res, next)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email})

        if (!user) return next(new Error('User not found'));

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword)
            return next(new Error('Invalid password'));

        const token = jwt.sign({id:user._id}, process.env.JWT)

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(201).json({user})
    } catch(error){
        next(error); // Pass the error to the error handling middleware
    }
}

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

//function for logging out user
const logoutController = async(req, res) => {
    res.clearCookie('access_token');
};

module.exports = {signupController, loginController, logoutController};