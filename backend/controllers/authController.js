const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {parseUserIdFromAccessToken, parseNameFromAccessToken} = require('../utils/validators');

//login
const loginController = async(req, res, next)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email})

        if (!user) return next(new Error('User not found'));

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword)
            return next(new Error('Invalid password'));

        const token = jwt.sign({user:{id:user._id, name: user.name}}, process.env.JWT)

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            path: '/',
        }).status(201).json({token});
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

        const token = jwt.sign({user:{id:user._id, name: user.name}}, process.env.JWT)

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            path: '/',
        }).status(201).json({token});
    } catch (error) {
        console.error('Error creating user:', error);
        next(error); // Pass the error to the error handling middleware
    }
}

//function for logging out user
const logoutController = async (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logged out successfully' });
};

const getToken = async(req, res) => {
    const token = req.cookies.access_token;
    if (token){
        res.status(200).json({token})
    } else{
        res.status(404).json({error: "token not found"})
    }
}

const getName = async (req, res) => {
    try{
        token = req.cookies.access_token;
        const name = parseNameFromAccessToken(token);
        res.status(200).json({name})
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching user name' });
    }

}

module.exports = {signupController, loginController, logoutController, getToken, getName};