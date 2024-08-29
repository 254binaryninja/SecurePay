const {getTransactionDetails} = require('../services/queryService.js');


async function checkFraud(req, res) {
    const { phoneNo, amount } = req.body;

    if (!phoneNo || !amount) {
        return res.status(400).json({message: 'Please provide all required fields'});
    }

    const result = await getTransactionDetails(phoneNo);
    if (result.proceed === 'yes') {
        res.json({message: 'Verification passed now proceed to the next step'});
    } else {
        res.status(400).json({message: 'Verification failed', reason: result.failureReason});
    }
}


module.exports = {checkFraud}