const express = require('express');
const secureRouter = require('./routes/secure-pay.routes');
const cors = require('cors');
const {authenticationSwapped} = require('./services/authenticationSMS.js');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/v1/secure-pay', secureRouter);
app.post('/sms-callback', express.json(), (req, res) => {
  console.log('Received SMS:', req.body);
  // Process the incoming SMS here
  if(req.body.status === 'Swapped'){
    authenticationSwapped(req.body.phoneNumber, req.body.userName)
  }else if (req.body.status === 'NoSwapDate'){
    authenticationSwapped(req.body.phoneNumber, req.body.userName)
  }else {
    authenticationSwapped(req.body.phoneNumber, req.body.userName);  
  }
  res.sendStatus(200);
});


app.listen(PORT, () => {
    console.log(`SecurePay listening on port ${PORT}`);
});