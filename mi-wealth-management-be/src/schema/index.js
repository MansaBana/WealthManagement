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

const goalSchema = {
    name: "goal",
    schema: {
      type: "object",
      properties: {
        goals: {
          type: "array",
          description: "List of investment risk categories.",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Category of risk level."
              },
              goalDescription: {
                type: "string",
                description: "will be the description of the user input goal"
              },
              investments: {
                type: "array",
                description: "List of investments in this risk category.",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Name of the investment type."
                    },
                    percentage: {
                      type: "integer",
                      minimum: 0,
                      maximum: 100,
                      description: "Percentage allocation of the investment."
                    }
                  },
                  required: ["name", "percentage"]
                }
              },
              description: {
                type: "string",
                description: "A brief description of the risk category."
              },
              customMessage: {
                type: "string",
                description: "A custom message for the user related to this investment category."
              }
            },
            required: ["name", "investments", "description", "customMessage"]
          }
        }
      },
      required: ["goals"]
    }
  };
  
  
  
  
module.exports = { bankStatementSchema, goalSchema };
  