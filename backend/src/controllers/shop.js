const fetch = require('node-fetch');
const sdk = require('bitnob');
const service = require('../../utils/service');

require('dotenv').config();

function listBusinessAddresses() {
  sdk['list-addresses']({ Authorization: `Bearer ${process.env.API_KEY}` })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

function listBusinessTransactions(req, res) {
  const customerID = req.headers.userid_id;
  const url = process.env.baseUrl + '/transactions/' + customerID;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.APIKEY,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error('error:' + err));
}

function sendBTCtoBusiness(req, res) {
  const { satoshis, address } = req.body;

  sdk['send-bitcoin'](
    {
      satoshis: satoshis,
      address: address,
      customerEmail: req.user.email,
      priorityLevel: 'regular',
    },
    { Authorization: `Bearer ${process.env.API_KEY}` }
  )
    .then((res) => res.status(200).send({msg: "Sent successfully"}))
    .catch((err) => res.status(400).send({msg: 'Cannot send btc'}));
}

function generateBtcAddressBusiness(req, res) {
  service
    .CreateCustomerBitcoinAddress(req.user.email)
    .then((res) => res.json())
    .then((json) => res.status(200).send(json.data))
    .catch((err) => res.status(403).send({msg: 'Unable to generate address'}));
}
module.exports = {
  listBusinessAddresses,
  listBusinessTransactions,
  sendBTCtoBusiness,
  generateBtcAddressBusiness,
};
