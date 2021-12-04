var express = require('express');
var router = express.Router();
require('dotenv').config();
const jwt = require("jsonwebtoken");
const validate = require('../../utils/validate')
const service = require('../../utils/service')
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const {validationResult } = require('express-validator');
const { response } = require('express');

const SECRET = process.env.JWT_SECRET;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

   

router.post("/register",validate.signupValidation, async (req, res, next) => {

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
     const password= await bcrypt.hash( req.body.password, 10);
     service.CreateCustomer(req.body.name,req.body.email,req.body.phone).then(res => res.json())
     .then(async json => {

      if (json.status){
         const users = await database("users").insert({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: password,
            customer_id: json.data['id']
         });
         if (!users){
          res.status(400).json({"err":error.detail});
         }else{
            console.log(users);
          res.json({"data":"user registered"})
         
         }
     }else{
      res.status(400).json({"err":"customer already exist"});
   } }).catch(err => console.log(err)); 
         
})


router.get("/verify", (request, response, next) => {
  const token = request.headers.authorization.split(" ")[1]
  jwt.verify(token, SECRET, (error, decodedToken) => {
     if(error){
        response.status(401).json({
           message: "Unauthorized Access!"
        })
     }else{
        response.status(200).json({
           id: decodedToken.id,
           email: decodedToken.email
        })
     }
  })
})

router.post("/login", validate.loginValidation,async (req, res, next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 const user=  await database("users").where({email:req.body.email}).first()
     if(!user){
        res.status(401).json({
           error: "No user by that name"
        })
     }else{
        const isAuthenticated = await bcrypt.compare(req.body.password, user.password)

           if(!isAuthenticated){
              res.status(401).json({
                 error: "Unauthorized Access!"
              })
           }else{
              return await jwt.sign(user, SECRET, (error, token) => {
                 res.status(200).json({token})
              })
           }
      
     
     }
})


module.exports = router;
