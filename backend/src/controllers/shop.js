const fetch = require('node-fetch');
const sdk = require('bitnob');
const service = require('../../utils/service')

require('dotenv').config();

function listBusinessAddresses() {
    sdk['list-addresses']({Authorization: `Bearer ${process.env.API_KEY}`})
     .then(res => console.log(res))
     .catch(err => console.error(err));
}

function listBusinessTransactions(req, res) {
    const customerID = req.headers.userid_id
    const url = process.env.baseUrl + '/transactions/' + customerID;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json', 
            Authorization: process.env.APIKEY
        }
    };

    fetch(url, options)
     .then(res => res.json())
     .then(json => console.log(json))
     .catch(err => console.error('error:' + err));
}

function sendBTCtoBusiness(req, res) {

   const  {satoshis, address, customerEmail }=req.body

    sdk['send-bitcoin']({
     satoshis: satoshis,
     address: address,
     customerEmail: customerEmail,
     priorityLevel: 'regular'
    }, 
    {Authorization: `Bearer ${process.env.API_KEY}`})
    .then(res => console.log(res))
    .catch(err => console.error(err));
}


 function generateBtcAddressBusiness(req, res) {

     const  {customerEmail}=req.body
     service.CreateCustomerBitcoinAddress(customerEmail)
     .then(res => res.json())
     .then(json => res.status(400).send(json.data))
    
    }
module.exports = {
    listBusinessAddresses,
    listBusinessTransactions,
    sendBTCtoBusiness,
    generateBtcAddressBusiness
}