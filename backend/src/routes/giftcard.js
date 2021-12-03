const express = require('express');
const router = express.Router();
const {createGiftcard} = require('../controllers/giftcard');
const {verify} = require('../../utils/jwt');
const validate = require('../../utils/validate');

router.post('/creategiftcard', verify, validate.giftcardValidation, createGiftcard);

module.exports = router;