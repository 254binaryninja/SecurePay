const {getTransactionDetails} = require('../services/queryService.js');


async function checkFraud(req,res) {
    const data = req.body;

    const result = await getTransactionDetails(data.phoneNo);
    if (result) {
        res.json({message: 'Verification passed now proceed to the next step'});
    }
}

module.exports = {checkFraud}