const express = require('express')
const fraudDetectorController = require('../controllers/fraud-detector.controller');

const secureRouter = express.Router()

secureRouter.post('/fraud-detector', fraudDetectorController.fraudDetector);

secureRouter.post('/incoming-messages', (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${data}`);
    res.sendStatus(200);
  });

module.exports = secureRouter