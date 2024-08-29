const fetch = require('node-fetch');

const VERIFICATION_API_URL = 'https://verification-api.example.com';

exports.triggerAdditionalVerification = async (transactionDetails) => {
  try {
    const response = await fetch(VERIFICATION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VERIFICATION_API_KEY}`
      },
      body: JSON.stringify(transactionDetails)
    })

    if (!response.ok) {
      throw new Error('Verification API request failed');
    }

    const result = await response.json();
    return result.verificationPassed;
  } catch (error) {
    console.error('Error in additional verification:', error);
    return false;
  }
}