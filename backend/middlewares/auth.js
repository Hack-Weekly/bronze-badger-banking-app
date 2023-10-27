const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        const error = new Error("Authorization header not found");
        error.status = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        const error = new Error("Token not found");
        error.status = 401;
        return next(error);
    }

    try {
        const decode = jwt.verify(token, process.env.JWT);
       
        if (!decode.user || !decode.user.id) {
            const error = new Error("Invalid token format");
            error.status = 401;
            return next(error);
        }

        const user = await User.findById(decode.user.id);

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            return next(error);
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        const customError = new Error("Invalid token");
        customError.status = 401;
        return next(customError);
    }
}


module.exports = isAuthenticated;