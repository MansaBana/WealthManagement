const nlp = require("compromise");

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
    const processedEmails = await emails?.map((email) => {
        return extractTransactionDetails(email);
    });
    return processedEmails;
}

module.exports = {processEmails}
