// Import the mongoose library
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log a confirmation message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs, log the error message and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

// Export the function so it can be used in other files
module.exports = connectDB;