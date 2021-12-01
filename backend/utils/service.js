const { response } = require('express');

require('dotenv').config();

const request= (url,method,data)=>{
    fetch(url, {
    method: method, 
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  return response;
}




const CreateCustomer=(name,email,phone)=>{

    payload = {

        "email": email,
    
        "firstName": name.split(' ')[0],
    
        "lastName": name.split(' ')[0],
    
        "phone":phone,
    
        "countryCode": "+234"
    
    }
 request(`process.env.URL${'customer'}`,'POST',payload)
  .then(response => response.json()).catch(error => next(error))


}


module.exports={CreateCustomer};