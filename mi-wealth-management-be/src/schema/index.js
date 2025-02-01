const bankStatementSchema = {
    name: "bankStatement",
    schema: {
      type: "object",
      properties: {
        balance: {
          type: "number",
          description: "The current balance after all transactions"
        },
        transactions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["Debit", "Credit"],
                description: "The type of transaction"
              },
              amount: {
                type: "number",
                description: "The amount involved in the transaction"
              },
              category: {
                type: "string",
                description: "Category of the transaction. Credited amounts should not be classified as earnings.",
                enum: [
                  "entertainment",
                  "food and drinks",
                  "transport",
                  "Miscellaneous",
                  "investment",
                  "Family & Children",
                  "earnings",
                  "shopping",
                  "bills",
                  "medical"
                ]
              },
              date: {
                type: "string",
                format: "date-time",
                description: "The date of the transaction in ISO 8601 format"
              },
              from: {
                type: "string",
                description: "The source of the transaction (e.g., payer or account)"
              }
            },
            required: ["type", "amount", "category", "date", "from"]
          }
        },
        investments: {
          type: "object",
          description: "Investment details including total investment amount and individual investments",
          properties: {
            totalInvestments: {
              type: "number",
              description: "The total amount invested"
            },
            list: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["Stocks", "Mutual Funds", "Other"],
                    description: "The type of investment (Stocks, Mutual Funds, or Other)"
                  },
                  amount: {
                    type: "number",
                    description: "The amount invested"
                  },
                  name: {
                    type: "string",
                    description: "The name of the stock, mutual fund, or other investment"
                  }
                },
                required: ["type", "amount"],
                default: {
                  type: "Other"
                }
              }
            }
          },
          required: ["totalInvestments", "list"]
        }
      },
      required: ["balance", "transactions", "investments"]
    }
  };
  
module.exports = { bankStatementSchema };
  