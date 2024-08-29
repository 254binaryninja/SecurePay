const express = require('express')
const fraudDetectorController = require('../controllers/fraud-detector.controller');

const secureRouter = express.Router()

secureRouter.post('/fraud-detector', fraudDetectorController.fraudDetector);

module.exports = secureRouter