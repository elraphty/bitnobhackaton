const express = require('express');
const router = express.Router();
uuid = require('uuidv4')
const {createGiftcard} = require('../controllers/giftcard')

router.post('/creategiftcard', createGiftcard)