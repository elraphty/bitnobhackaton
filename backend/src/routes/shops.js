var express = require('express');
var router = express.Router();
const {
    listBusinessAddresses,
    listBusinessTransactions,
    sendBTCtoBusiness
} = require('../controllers/shop')


/* GET home page. */
router.get('/listbusinessaddresses', listBusinessAddresses);
router.get('/listbusinesstransactions', listBusinessTransactions);
router.get('/sendbtctobusiness', sendBTCtoBusiness);

module.exports = router;
