const {proxy} = require('valtio')

const state = proxy({
    amount: 0,
    phoneNo: '+254701729985',
    pin: '1234567890',
    userName: 'sandbox',
    checkPin: Boolean,
})

module.exports = state