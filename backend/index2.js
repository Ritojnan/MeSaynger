const connectToMongo = require('./db');
const express = require('express');
const http = require('http');
const {Server} = require("socket.io");
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const socketIo = require('socket.io');
const app = express();
const port = 5000;

connectToMongo();
const server = http.createServer(app);  // Create an HTTP server instance
app.use(cors());
// const io = socketIo(server);  // Attach Socket.IO to the server
const io = new Server(server,{
cors:{
  origin:"http://localhost:5173",
  methods:["GET","POST"],
}

})



// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve static files (images in this case)
app.use('/uploads', express.static('uploads'));

// Handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    // Here, you can save the image to your preferred storage or database.
    // For simplicity, this example saves the image in memory and sends back a success response.
    const imageBuffer = req.file.buffer;
    console.log(imageBuffer)
    // Save the image buffer to your storage/database as needed.
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});


app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/images', require('./routes/imageRoutes'));

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Handle chat events
  socket.on('sendMessage', (message) => {
    // Process and store the message
    // Emit a 'newMessage' event to all connected clients
    io.emit('newMessage', message);
  });
});

server.listen(port, () => {
  console.log(`MeSaynger backend listening at http://localhost:${port}`);
});



const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`MeSaynger backend listening at http://localhost:${port}`)
})



const app = express();
const port = 5000;

// Configure MongoDB connection
mongoose.connect('mongodb://localhost/image-upload-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the Image model outside of route handlers
const Image = mongoose.model('Image', {
  name: String,
  data: Buffer,
});

// Enable CORS for all routes
app.use(cors()); // Use the cors middleware

// Serve static files (images)
app.use('/uploads', express.static('uploads'));

// Handle image upload
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { originalname, buffer } = req.file;

    const image = new Image({ name: originalname, data: buffer });
    await image.save();
    console.log("done")
    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Fetch all images
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});