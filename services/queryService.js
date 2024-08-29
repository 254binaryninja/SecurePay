require("dotenv").config({ path: path.join(__dirname, '..', '.env') });

 async  function getTransactionDetails(phoneNo,amount) {
// Call the SIM SWAP API to get phone number status
try {
    
  let proceed = ''
  let failureReason = ''
 const response  = await fetch('https://insights.sandbox.africastalking.com/v1/sim-swap',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'apiKey':process.env.SIM_SWAP_API
        },
        body:{
            "username":process.env.USER_NAME,
            "phoneNumber":phoneNo
        }
 })

     const results = await response.json()

     if(results.responses.status == 'NoSwapDate'){
            // Return a yes response
           proceed = 'yes'
     }
     else if(results.responses.status == 'Swapped'){
        proceed = 'no'
     }
     else{
        proceed = 'error'
        failureReason = results.responses.status
     }
} catch (error) {
    Console.log(error)
}
}

module.exports = getTransactionDetails