const fetch = require('node-fetch');
require('dotenv').config();



  

const instance = async (url,method,data)=>{
  return await fetch(process.env.base_URL+url, {
    method: method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', "Authorization":`Bearer ${process.env.API_KEY}` }
})
}




const CreateCustomer=  async(name,email,phone)=>{

    payload = { 

        "email": email,
    
        "firstName": name.split(' ')[0],
    
        "lastName": name.split(' ')[1],
    
        "phone":phone,
    
        "countryCode": "+234"
    
    }
 return instance('customers',"POST",payload)
}

const CreateCustomerBitcoinAddress= (email)=>{

  payload = { 
      "label": "customer wallet",
      "customerEmail": email
  }
return instance('addresses/generate ',"POST",payload)
}


module.exports={CreateCustomer,CreateCustomerBitcoinAddress};