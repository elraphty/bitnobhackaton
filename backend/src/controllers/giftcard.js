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

  const { amount } = req.body;
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
    return res
      .status(401)
      .json({ msg: 'Error occured while creating giftcard' });
  }
}

async function verifyGiftcard(req, res) {
  const code = req.body.code;
  const amount = req.body.amount;
  const user_id = req.user.id;

  try {
    // giftcard validations
    const gifcard = await database('giftcards').where({ code: code }).first();
    if (!gifcard) {
      return res.status(400).json({ message: 'This giftcard is not valid' });
    } else {
      // check the gifcard logs get the sum of giftcard value spent
      const sum_result = await database('giftcard_logs')
        .sum('amount')
        .where({ code: code })
        .first();

      if (sum_result.sum + amount > gifcard.amount) {
        return res.status(400).json({ msg: 'insuficient giftcard balance' });
      } else {
        // check if the business is created in the giftcard balance
        const user_balance = await database('giftcard_balance').where({
          user_id,
        });
        if (user_balance.length === 0) {
          // Create user balance
          await database('giftcard_balance').insert({
            user_id,
            balance: amount,
          });

          // Insert in Logs
          await database('giftcard_logs').insert({
            user_id,
            amount,
            code,
          });

          // Send Response
          return res.status(200).json({ msg: 'Successfully claim giftcard' });

        } else {
          // Update User Balance
          await database('giftcard_balance')
            .update({ balance: user_balance[0].balance + amount })
            .where({ user_id });

          // Insert in Logs
          await database('giftcard_logs').insert({
            user_id,
            amount,
            code,
          });

          // Send Response
          return res.status(200).json({ msg: 'Successfully claim giftcard' });
        }
      }
    }
  } catch (e) {
    return res
    .status(401)
    .json({ msg: 'Error occured while claiming giftcard' });
  }
}

module.exports = {
  createGiftcard,
  verifyGiftcard,
};
