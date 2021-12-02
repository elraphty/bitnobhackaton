const { response } = require('../app');

uuid = require('uuidv4')

async function createGiftcard (req, res) {
    (amount) = req.body
    customerID = req.headers.user_id;

    const user =  await database("users").where({id:customerID})
     if(!user){
        response.status(401).json({
           error: "User does not exist, please register to create giftcard"
        })
    } 
    else {
        const code = uuid();
        const giftcards = database("giftcards").insert({
           user_id: customerID,
           code: code,
           amount: amount
        });

        return response.status(200).json({"message": `You have ${amount} worth of giftcard, your giftcard token is ${code}`})
    }

}

module.exports = {
    createGiftcard
}