const emailData = require('../models/EmailModel');
const {processEmails} = require('../services/emailExtactionService');

const getEmailsAndExtractData = async (req, res, next) => {
    try {
        // Fetch all documents from the userData collection
        const emails = await emailData.find({emailAddress: "user@example.com"});
        console.log("emails", emails);
        const bankStatement = await processEmails(emails[0]?.emails);
        res.json(bankStatement);
      } catch (err) {
        next(err);
      }
}

module.exports = {getEmailsAndExtractData}
