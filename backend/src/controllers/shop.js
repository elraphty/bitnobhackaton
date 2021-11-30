const fetch = require('node-fetch');
const sdk = require('bitnob');

function listBusinessAddresses() {

    sdk['list-addresses']({Authorization: 'Bearer API-KEY'})
     .then(res => console.log(res))
     .catch(err => console.error(err));
}

function listBusinessTransactions() {

    const url = 'https://sandboxapi.bitnob.co/api/v1/transactions/?order=ASC&page=2&take=10';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json', 
            Authorization: 'Bearer API-KEY'
        }
    };

    fetch(url, options)
     .then(res => res.json())
     .then(json => console.log(json))
     .catch(err => console.error('error:' + err));
}

function sendBTCtoBusiness(req, res) {

    ( satoshis, address, customerEmail ) = req.body

    sdk['send-bitcoin']({
     satoshis: satoshis,
     address: address,
     customerEmail: customerEmail,
     priorityLevel: 'regular'
    }, 
    {Authorization: 'Bearer API-KEY'})
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

module.exports = {
    listBusinessAddresses,
    listBusinessTransactions,
    sendBTCtoBusiness,
}