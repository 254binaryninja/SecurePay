const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });

async function getTransactionDetails(phoneNo) {
  try {
    let proceed = ''
    let failureReason = ''
    const response = await fetch('https://insights.sandbox.africastalking.com/v1/sim-swap', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'apiKey': process.env.SIM_SWAP_API
      },
      body: JSON.stringify({
        "username": process.env.USER_NAME,
        "phoneNumber": phoneNo
      })
    })

    const results = await response.json()

    if (results.responses.status == 'NoSwapDate') {
      proceed = 'yes'
    } else if (results.responses.status == 'Swapped') {
      proceed = 'no'
    } else {
      proceed = 'error'
      failureReason = results.responses.status
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getTransactionDetails }