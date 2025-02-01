const emailData = require("../models/EmailModel");
const { processEmails } = require("../services/emailExtactionService");

const getEmailsAndExtractData = async (req, res, next) => {
  try {
    // Fetch all documents from the userData collection
    const requestBody = req?.body;
    console.log(req?.body);
    const emails = await emailData.find({
      emailAddress: requestBody?.emailAddress,
    });
    console.dir(emails, { depth: null });
    const bankStatement = await processEmails(emails[0]?.emails);
    res.json(bankStatement);
  } catch (err) {
    next(err);
  }
};

module.exports = { getEmailsAndExtractData };
