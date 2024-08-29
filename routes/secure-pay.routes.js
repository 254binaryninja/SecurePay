const express = require('express')


const secureRouter = express.Router()


secureRouter.post('/incoming-messages', (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${data}`);
    res.sendStatus(200);
  });

module.exports = secureRouter