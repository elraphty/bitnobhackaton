const express = require('express');
const router = express.Router();
const {verify} = require('../../utils/jwt');
const validate = require('../../utils/validate');

const {
    listBusinessAddresses,
    listBusinessTransactions,
    sendBTCtoBusiness,
    generateBtcAddressBusiness

} = require('../controllers/shop')


router.get('/listbusinessaddresses', listBusinessAddresses);
router.get('/listbusinesstransactions', listBusinessTransactions);
router.post('/sendbtctobusiness', verify, validate.sendBtc, sendBTCtoBusiness);
router.post('/generatebtcaddress', verify, generateBtcAddressBusiness);


module.exports = router;
