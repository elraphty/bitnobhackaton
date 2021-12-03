const { body } = require('express-validator');

exports.signupValidation = [
    body('nambodye', 'Name is requied').isEmpty(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]
 
exports.loginValidation = [
     body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
]