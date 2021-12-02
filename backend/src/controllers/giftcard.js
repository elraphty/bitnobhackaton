const uuid = require('uuidv4')
const database = require('knex')(configuration);

async function createGiftcard (req, res) {
    (amount) = req.body
    customerID = req.headers.user_id;

    try {

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

       return res.status(201).json({"data":code})
   }
      
    }
     catch (error) {
        console.log(error);
    }

}

async function verifyGiftcard(req, res) {
    const code = req.body.code;
    const balance = await database("gitfcard_balance").where({code: code})
    if(!code) {
        return res.status(400).json({message:"This giftcard is not valid"})
    }
    else {
        
    }
}

module.exports = {
    createGiftcard,
    verifyGiftcard
}