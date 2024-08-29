const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const Africastalking = require('africastalking')

const africastalking = Africastalking({
    apiKey: process.env.SMS_API_KEY,
    username: process.env.USER_NAME
})

async function authenticationSwapped(phoneNo, userName) {
    try {
        await africastalking.SMS.send({
            to: phoneNo,
            message: `Hello, ${userName} here. I see you are trying to make a payment. Please confirm if you have swapped your SIM card. Reply with your saved 10 digit pIN if you have swapped your SIM card. If you have not swapped your SIM card, reply with the word "NO".`,
            from: process.env.SENDER_ID
        });
    } catch (error) {
        console.log(error)
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