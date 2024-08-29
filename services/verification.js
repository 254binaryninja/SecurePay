const {
  authenticationSwapped,
  authenticationAmount,
} = require("./authenticationSMS.js");
const state = require("../store/index");

exports.triggerAdditionalVerification = async (phoneNo) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await authenticationSwapped(phoneNo);
    if (state.checkPin) {
      return true;
    } else {
      return false;
    }
    // if (!response.ok) {
    //   throw new Error('Verification API request failed');
    // }

    // const result = await response.json();
    // return result.verificationPassed;
  } catch (error) {
    console.error("Error in additional verification:", error);
    return false;
  }
};
