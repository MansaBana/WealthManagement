const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL || 'mongodb+srv://admin:tTQeOlQLYR0FNkL9@cluster0.fpf49.mongodb.net/wealth-management?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;