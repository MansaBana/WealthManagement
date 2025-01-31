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
app.use('/api', userRoutes);
app.use('/api/email', emailRoutes); // Mount user routes at /api/users

// Error Handler Middleware (must be the last middleware)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;