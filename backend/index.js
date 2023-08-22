const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatAppDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes and start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
