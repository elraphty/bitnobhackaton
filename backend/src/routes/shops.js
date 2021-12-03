const express = require('express');
const router = express.Router();
const {
    listBusinessAddresses,
    listBusinessTransactions,
    sendBTCtoBusiness
} = require('../controllers/shop')


router.get('/listbusinessaddresses', listBusinessAddresses);
router.get('/listbusinesstransactions', listBusinessTransactions);
router.get('/sendbtctobusiness', sendBTCtoBusiness);

module.exports = router;
