const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/aiConfig.js');

const genAI = new GoogleGenerativeAI(aiConfig.GEMINI_API_KEY);

exports.analyzeWithGemini = async (transactionDetails) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro'})
  const prompt = `Analyze this transaction for potential fraud: ${transactionDetails}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}