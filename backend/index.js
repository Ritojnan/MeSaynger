const connectToMongo = require('./db');
const express = require('express');
const http = require('http');
const {Server} = require("socket.io");
// const socketIo = require('socket.io');
var cors = require('cors');

// connectToMongo();
const app = express();
const server = http.createServer(app);  // Create an HTTP server instance
app.use(cors());
// const io = socketIo(server);  // Attach Socket.IO to the server
const io = new Server(server,{
cors:{
  origin:"http://localhost:5173",
  methods:["GET","POST"],
}

})
const port = 5000;

// app.use(express.json());

// // Available Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

// // Socket.IO Connection
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });

//   // Handle chat events
//   socket.on('sendMessage', (message) => {
//     // Process and store the message
//     // Emit a 'newMessage' event to all connected clients
//     io.emit('newMessage', message);
//   });
// });

server.listen(port, () => {
  console.log(`MeSaynger backend listening at http://localhost:${port}`);
});






// const connectToMongo = require('./db');
// const express = require('express')
// var cors = require('cors') 

// connectToMongo();
// const app = express()
// const port = 5000

// app.use(cors())
// app.use(express.json())

// // Available Routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))


// app.listen(port, () => {
//   console.log(`MeSaynger backend listening at http://localhost:${port}`)
// })