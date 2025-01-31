import { createCompletion } from "./script";
import fs from "fs";

export const statementSchema = {
  name: "statement_details",
  schema: {
    type: "object",
    properties: {
      person: {
        type: "object",
        properties: {
          age: {
            type: "number",
          },
          gender: {
            type: "string",
          },
          occupation: {
            type: "string",
          },
          location: {
            type: "string",
          },
          relationship_status: {
            type: "string",
          },
          children: {
            type: "string",
          },
          income: {
            type: "string",
          },
          expenses: {
            type: "string",
          },
        },
      },
      bank_statement: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
              type: "string",
            },
            amount: {
              type: "number",
            },
            date: {
              type: "string",
            },
            from: {
              type: "string",
            },
          },
        },
      },
      stock_transactions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            stock_name: {
              type: "string",
            },
            quantity: {
              type: "number",
            },
            purchase_price: {
              type: "number",
            },
            date_of_purchase: {
              type: "string",
            },
            current_value: {
              type: "number",
            },
          },
        },
      },
      real_estate_properties: {
        type: "array",
        items: {
          type: "object",
          properties: {
            property_name: {
              type: "string",
            },
            purchase_price: {
              type: "string",
            },
            location: {
              type: "string",
            },
            date_of_purchase: {
              type: "string",
            },
            sq_ft_area: {
              type: "string",
            },
          },
        },
      },
      other_assets: {
        type: "array",
        items: {
          type: "object",
          properties: {
            asset_type: {
              type: "string",
            },
            purchase_price: {
              type: "string",
            },
            date_of_purchase: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const variables = {
  model: "gpt-4o-mini",
  response_format: { type: "json_schema", json_schema: statementSchema },
  messages: [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: `
                1. There exists a person as below 
                2. 22 | M | College Student | - | Tier 2 | Single | No kids | ₹10K (Living with family, college expenses) | India
                3. Generate 1 month back statement for the person with montly 5 to 7 transactions as json.
                4. In the stement specify whether it is a debit/credit, how much, when, to or from whom.
                5. try to diversify and add all the different type of transactions that a person with this profile generally does.
                6. For example, travel, food, fun, subscriptions, shopping, salary, etc.

                7. Add The user personal details also just outside the statement, make expense in accordance with the salary.

                8. Also add the Dmat account details and the stock transactions. for the same duration.
                9. Add the stock name(Real stocks), quantity, purchase price, date of purchase, current value.

                13. Also give a list of at max 5 real estate properties owned by the person.
                14. In the real estate list add the purchase price, location till district level (real places in the user's country), and the date of purchase, sq ft area,.

                15. Also give a list of at max 5 other kind of physical assests like golds, wartches, cars, etc which have resale values.
                16 with details like purchase price, date of purchase.
            `,
        },
      ],
    },
  ],
};

const generateMock = async () => {
  const val = await createCompletion(variables);
  console.dir(val.choices[0].message.content, { depth: null });
  fs.writeFile(
    "./MockPersons/22M-STU-T2-S-0.json",
    JSON.stringify(JSON.parse(val.choices[0].message.content), null, 2),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

generateMock();
