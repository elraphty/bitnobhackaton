const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create an account
router.post('/createshop', (req, res) => {
  return 
})

// Check if a code is valid
router.get('/checkcode', (req, res) => {
  giftCardCode, total = req.query
  
})

module.exports = router;
