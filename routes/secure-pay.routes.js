const express = require('express')
const state = require('../store/index')
const {useSnapshot} = require('valtio')
const {checkFraud} = require('../controllers/SecurePay.js')

//const snap = useSnapshot(state)

const fraudDetectorController = require('../controllers/fraudDetectorController.js');

const secureRouter = express.Router()

secureRouter.post('/sms-callback', express.json(), (req, res) => {
  console.log('Received SMS:', req.body);
  // Process the incoming SMS here
  res.sendStatus(200);
});
secureRouter.post('/fraud-detector', fraudDetectorController.detectFraud);
secureRouter.post('/verification', checkFraud)
secureRouter.post('/incoming-messages', (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${data}`);
    if (data == snap.pin) {
        state.checkPin = true;
    } else {
        state.checkPin = false;
    }
    res.sendStatus(200);
});

module.exports = secureRouter