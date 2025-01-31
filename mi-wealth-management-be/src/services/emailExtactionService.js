const nlp = require("compromise");

// Mock email data
const emails = [
  {
    subject: "Transaction Alert - Payment to Amazon",
    body: `
      Dear Customer,
      A transaction of $49.99 has been made on your card ending with 1234 at AMAZON.COM.
      Date: 2023-10-15
      Available Balance: $1,200.00
      If you did not authorize this transaction, please contact us immediately.
      Thank you,
      Your Bank
    `,
  },
  {
    subject: "Payment Received - Thank You",
    body: `
      Hello,
      We have received your payment of $200.00 for your credit card account ending in 5678.
      Payment Date: 2023-10-14
      Thank you for paying on time!
      Sincerely,
      Credit Card Company
    `,
  },
  {
    subject: "Your Netflix Subscription has been Renewed",
    body: `
      Hi there,
      Your Netflix subscription has been renewed for $15.99 on 2023-10-13.
      The payment was charged to your card ending in 9876.
      Next billing date: 2023-11-13.
      Thank you for choosing Netflix!
    `,
  },
  {
    subject: "Salary Credited to Your Account",
    body: `
      Dear Employee,
      Your salary of $4,500.00 has been credited to your account ending in 3456.
      Transaction Date: 2023-10-10
      Thank you for your hard work!
      HR Department
    `,
  },
];

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
    const processedEmails = await emails.map((email) => {
        return extractTransactionDetails(email);
    });
    return processedEmails;
}

module.exports = {processEmails}
