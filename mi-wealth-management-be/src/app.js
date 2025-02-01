const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const inputRoutes = require('./routes/inputRoutes');
app.use('/api', userRoutes);
app.use('/api/email', emailRoutes); // Mount user routes at /api/users
app.post(`/api/userInput`, async(req, res)=>{
  console.log('userInput', req.body);

  const response = await fetch('http://localhost:3001/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
  console.log('response', JSON.parse(response.body));

  res.send('userInput');
});

// Error Handler Middleware (must be the last middleware)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;