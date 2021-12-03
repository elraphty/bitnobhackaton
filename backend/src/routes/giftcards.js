const express = require('express');
const router = express.Router();
const {createGiftcard, verifyGiftcard} = require('../controllers/giftcard');
const {verify} = require('../../utils/jwt');
const validate = require('../../utils/validate');

router.post('/', validate.giftcardValidation, verify, createGiftcard);
router.post('/claim', validate.giftcardClaimValidation, verify, verifyGiftcard);

module.exports = router;