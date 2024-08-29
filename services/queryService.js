const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });

async function getTransactionDetails(phoneNo) {
  try {
    let proceed = '';
    let failureReason = '';
    const requestBody = {
      "username": process.env.USER_NAME,
      "phoneNumbers": phoneNo
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://insights.sandbox.africastalking.com/v1/sim-swap', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'apiKey': process.env.SIM_SWAP_API
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    console.log('API response:', JSON.stringify(results, null, 2));

    // Process the results as before
    if (results.responses[0].status == 'NoSwapDate') {
      proceed = 'yes';
    } else if (results.responses[0].status == 'Swapped') {
      proceed = 'no';
    } else {
      proceed = 'error';
      failureReason = results.responses[0].status;
    }

    return { proceed, failureReason, results };
  } catch (error) {
    console.log(error);
    return { proceed: 'error', failureReason: error.message };
  }
}

module.exports = { getTransactionDetails };