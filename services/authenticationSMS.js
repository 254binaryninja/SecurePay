const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const Africastalking = require('africastalking')
const { getTransactionDetails } = require('./queryService');

const africastalking = Africastalking({
    apiKey: process.env.SMS_API_KEY,
    username: process.env.USER_NAME
})

// const sandboxPhoneNumber = '+254796984597';

async function authenticationSwapped(phoneNo, userName) {
    const { proceed, failureReason } = await getTransactionDetails(phoneNo);

    let message;
    if (proceed === 'yes') {
        message = `Hello, ${userName}. No SIM swap detected. Your transaction can proceed normally.`;
    } else if (proceed === 'no') {
        message = `Hello, ${userName}. A SIM swap has been detected. Please confirm your identity by replying with your 10-digit PIN.`;
    } else {
        message = `Hello, ${userName}. We encountered an issue checking your SIM status: ${failureReason}. Please try again later.`;
    }

    try {
    const result = await africastalking.SMS.send({
      // to: sandboxPhoneNumber, // Use sandbox number instead of phoneNo
      message: message,
      from: process.env.SENDER_ID
    });
    console.log('SMS sent:', result);
  } catch (error) {
    console.log(error);
  }
}


async function authenticationAmount(phoneNo, amount, userName) {
    try {
        const result = await africastalking.SMS.send({
            to: phoneNo,
            message: `Hello, ${userName} here. I see you are trying to make a payment of Ksh ${amount}. Please reply with the word "YES followed by your 10 digit pin " to confirm the amount or reply with the word "NO followed by your 10 digit pin" to cancel the transaction.`,
            from: process.env.SENDER_ID_2
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { authenticationSwapped, authenticationAmount }