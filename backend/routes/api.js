const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api'); // Import the api.js router

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatAppDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the apiRouter as middleware to define API routes
app.use('/api', apiRouter);

// Define other routes or middleware here

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
