const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());

// Routes
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

app.use(express.json());

app.use(cors("*"));

const userRoutes = require("./routes/userRoutes");
const emailRoutes = require("./routes/emailRoutes");
const inputRoutes = require("./routes/inputRoutes");
app.use("/api", userRoutes);
app.use("/api/email", emailRoutes); // Mount user routes at /api/users
app.post(`/api/goals`, async (req, res) => {
  console.log("userInput", req.body);
  const goal = req.body.goal;
  const data = req.body.data;
  const variables = {
    model: "gpt-4o-mini",
   response_format: { type: "json_schema", json_schema: goalSchema },
    messages: [
      {
        role: "system",
        content:
          "analyse the goal given by the user and create a investment plan, suggest where the user can reduce or increase the spends, manage their finances geerate a json output all the fields are required",
      },
      
      { role: "user", content: `this it the goal ${goal} plan using the users data ${data}` },
    ],
  };
  const result = await createCompletion(variables);
  console.log("result", result.choices[0].message.content);
  res.send( JSON.parse(result.choices[0].message.content));
});

// Error Handler Middleware (must be the last middleware)
const errorHandler = require("./middleware/errorHandler");
const { goalSchema } = require("./schema");
const { createCompletion } = require("./utils");
app.use(errorHandler);

module.exports = app;
