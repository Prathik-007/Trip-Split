// Import the 'express' library
const express = require('express');

// Import the 'dotenv' library to manage environment variables
const dotenv = require('dotenv');

const connectDB = require('./config/db'); // Import our new function

// Load the environment variables from our .env file
dotenv.config();

connectDB(); // Call the function to connect to the database

// Create an instance of the Express application
const app = express();

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/expenses',require('./routes/expenses'));
// Define the port the server will run on.
// It will try to get the port from the .env file, or default to 5000
const PORT = process.env.PORT || 5000;

// Create a basic "route" or "endpoint"
// This tells the server what to do when someone visits the main URL (e.g., http://localhost:5000/)
//This method defines a GET route. It listens for GET requests that is the http://localhost:5000/ which send a message.
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server and make it listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});