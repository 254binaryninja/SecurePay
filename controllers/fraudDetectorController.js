//const simSwapService = require('../services/simSwap.js');
const verificationService = require('../services/verification.js');
const aiAnalysisService = require('../services/aiAnalysis.js');
const {getTransactionDetails} = require('../services/queryService.js');

// Controller function to handle the fraud detection process
exports.detectFraud = async (req, res) => {
  try {
    const transactionDetails = req.body;
    const simSwapResult = await getTransactionDetails(transactionDetails.phoneNo);

    if (simSwapResult.proceed === 'no') {
      transactionDetails.riskLevel = 'High';
      // transactionDetails.reason = 'Sim Swap Detected';
      const verificationPassed = await verificationService.triggerAdditionallVerification(phoneNo);

      if (verificationPassed) {
        const aiAnalysisResult = await aiAnalysisService.analyzeTransaction(transactionDetails.amount);
        // if (aiAnalysisResult.isFraudulent) {
          // transactionDetails.riskLevel = 'High';
          // transactionDetails.reason = 'AI Analysis Detected Fraud';
        // }        const verificationService = require('../services/verification.js');
        const aiAnalysisService = require('../services/aiAnalysis.js');
        const {getTransactionDetails} = require('../services/queryService.js');
        
        exports.detectFraud = async (req, res) => {
          try {
            const transactionDetails = req.body;
            const simSwapResult = await getTransactionDetails(transactionDetails.phoneNo);
        
            if (simSwapResult.proceed === 'no') {
              transactionDetails.riskLevel = 'High';
              const verificationPassed = await verificationService.triggerAdditionalVerification(transactionDetails.phoneNo);
        
              if (verificationPassed) {
                const aiAnalysisResult = await aiAnalysisService.analyzeTransaction(transactionDetails.amount);
                res.json({
                  riskLevel: transactionDetails.riskLevel,
                  aiAnalysis: aiAnalysisResult,
                  message: 'Transaction processed successfully',
                })
              } else {
                res.status(403).json({ message: 'Additional verification failed' });
              }
            } else {
              res.json({
                riskLevel: transactionDetails.riskLevel,
                message: 'Transaction processed successfully',
              })
            }
          } catch (error) {
            console.error('Error in fraud detection:', error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }
        res.json({
          riskLevel: transactionDetails.riskLevel,
          aiAnalysis: aiAnalysisResult,
          message: 'Transaction processed successfully',
        })
      } else {
        res.status(403).json({ message: 'Additional verification failed' });
      }
    } else {
      res.json({
        riskLevel: transactionDetails.riskLevel,
        message: 'Transaction processed successfully',
      })
    }
  } catch (error) {
    console.error('Error in fraud detection:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}