const uuid = require('uuidv4')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

async function createGiftcard (req, res) {
    (amount) = req.body
    customerID = req.headers.user_id;

    try {

    const user =  await  database("users").where({id:customerID}).first()
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

       return res.status(201).json({"data":code})
   }
      
    }
     catch (error) {
        console.log(error);
    }

}

async function verifyGiftcard(req, res) {
    const code = req.body.code;
    const value = await database("giftcards").where({code: code})
    if(!value) {
        return res.status(400).json({message:"This giftcard is not valid"})
    }
    else {
        return res.status(400).json({value})
    }
}

module.exports = {
    createGiftcard,
    verifyGiftcard
}