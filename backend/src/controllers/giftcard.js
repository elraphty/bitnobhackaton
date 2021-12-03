const { v4: uuidv4 } = require('uuid');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const { validationResult } = require('express-validator');

async function createGiftcard(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {amount} = req.body;
  const customerID = req.user.id;

  try {
    const user = await database('users').where({ id: customerID }).first();
    if (!user) {
      response.status(401).json({
        error: 'User does not exist, please register to create giftcard',
      });
    } else {
      const code = uuidv4().substr(0, 8);
      await database('giftcards').insert({
        user_id: customerID,
        code: code,
        amount: amount,
      });

      return res.status(201).json({ data: code });
    }
  } catch (error) {
    console.log('Error ===', error);
    return res.status(401).json({ msg: 'Error occured while creating giftcard' });
  }
}

async function verifyGiftcard(req, res) {
  const code = req.body.code;
  const value = await database('giftcards').where({ code: code });
  if (!value) {
    return res.status(400).json({ message: 'This giftcard is not valid' });
  } else {
    return res.status(400).json({ value });
  }
}

module.exports = {
  createGiftcard,
  verifyGiftcard,
};
