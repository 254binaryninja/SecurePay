const simSwapService = require('../services/simSwap.js');
const verificationService = require('../services/verification.js');
const aiAnalysisService = require('../services/aiAnalysis.js');

// Controller function to handle the fraud detection process
exports.detectFraud = async (req, res) => {
  try {
    const transactionDetails = req.body;
    const simSwapResult = await simSwapService.checkSimSwap(transactionDetails.phoneNo);

    if (simSwapResult.isSwapped) {
      transactionDetails.riskLevel = 'High';
      // transactionDetails.reason = 'Sim Swap Detected';
      const verificationPassed = await verificationService.triggerAdditionallVerification(transactionDetails);

      if (verificationPassed) {
        const aiAnalysisResult = await aiAnalysisService.analyzeTransaction(transactionDetails);
        // if (aiAnalysisResult.isFraudulent) {
          // transactionDetails.riskLevel = 'High';
          // transactionDetails.reason = 'AI Analysis Detected Fraud';
        // }
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