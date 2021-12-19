const express = require('express');
const router = express.Router();
const {
    listBusinessAddresses,
    listBusinessTransactions,
    sendBTCtoBusiness,
    generateBtcAddressBusiness

} = require('../controllers/shop')


router.get('/listbusinessaddresses', listBusinessAddresses);
router.get('/listbusinesstransactions', listBusinessTransactions);
router.post('/sendbtctobusiness', sendBTCtoBusiness);
router.post('/generatebtcaddress', generateBtcAddressBusiness);


module.exports = router;
