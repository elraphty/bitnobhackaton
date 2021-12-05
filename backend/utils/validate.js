const { body } = require('express-validator');

exports.signupValidation = [
  body('nambodye', 'Name is requied').isEmpty(),
  body('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  body('password', 'Password must be 6 or more characters').isLength({
    min: 6,
  }),
];

exports.loginValidation = [
  body('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  body('password', 'Password must be 6 or more characters').isLength({
    min: 6,
  }),
];

exports.giftcardValidation = [
  body('amount', 'Please a valid bitcoin amount')
    .isNumeric()
    .isLength({ min: 1 }),
];

exports.giftcardClaimValidation = [
  body('amount', 'Please a valid bitcoin amount')
    .isNumeric()
    .isLength({ min: 1 }),
  body('code', 'Please send a valid giftcard code')
    .isString()
    .isLength({ min: 8 }),
];

exports.sendBtc = [
  body('satoshi', 'Please enter customers Email')
    .isNumeric()
    .isLength({ min: 1 }),
  body('address', 'Please enter a valid address')
    .isString()
    .isLength({ min: 20 }),
];
