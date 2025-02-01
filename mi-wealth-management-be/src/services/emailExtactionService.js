// const nlp = require("compromise");
const { createCompletion } = require("../utils");
const { model } = require("mongoose");
const { response, json } = require("express");
const { bankStatementSchema } = require("../schema");


// Function to extract transaction details
const extractTransactionDetails = (email) => {
  const doc = nlp(email.body);

  const amountMatch = email.body.match(/₹([\d,]+)/);
  const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : null;

  // Extract date using regex (matches YYYY-MM-DD format)
  const dateMatch = email.body.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? new Date(dateMatch[0]) : null;

  // Determine type (Debit or Credit)
  let type = "Debit"; // Default to Debit
  if (
    email.body.toLowerCase().includes("received") ||
    email.body.toLowerCase().includes("credited")
  ) {
    type = "Credit";
  }

  // Extract "from" field (merchant or sender)
  let from = doc.match("#Organization").out("text") || "Unknown";

  return {
    type,
    amount,
    date,
    from,
  };
}

const processEmails = async (emails) => {
    // const processedEmails = await emails?.map((email) => {
    //     return extractTransactionDetails(email);
    // });
    // return processedEmails;
 console.log(emails)
    const variables = {
      model: "gpt-4o-mini",
      response_format: { type: "json_schema", json_schema: bankStatementSchema },
      messages: [
        { role: "system", content: `Analyse the transaction and give me a JSON object of an analysis return all the transactions made, investments, and other details
          1. if payment was madde to the credit card it shoud be classified as debit
          2. if data is not found from the emial it then give a mock data for investments details always give mock for investment list
          `},
        ...emails.map((email) => {
          return {
            role: "user",
            content: `analyse the transaction in this email: ${email.body}`,
          };
        }),
      ]
    }
    const aiResponse = await createCompletion(variables)

    return JSON.parse(aiResponse.choices[0].message.content);
}

module.exports = {processEmails}
