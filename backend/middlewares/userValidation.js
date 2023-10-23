const { validateName, validateEmail, validatePassword } = require('../utils/validators'); // Adjust the path as needed

const userValidation = (req, res, next) => {
    const { name, email, password } = req.body;

    // Validate name
    if (!validateName(name)) {
        const error = new Error('Invalid name format');
        error.statusCode = 400;
        return next(error);
    }

    // Validate email
    if (!validateEmail(email)) {
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        return next(error);
    }

    // Validate password
    if (!validatePassword(password)) {
        const error = new Error('Invalid password format');
        error.statusCode = 400;
        return next(error);
    }

    // If all validations pass, proceed to the next middleware
    next();
};

module.exports = userValidation;