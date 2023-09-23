const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
// app.use('/public', express.static('public'));
app.use(express.static('../MeSaynger/dist'));

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/images', require('./routes/images'))
app.use('/api/chatbot', require('./routes/chatbot'))


app.listen(port, () => {
  console.log(`MeSaynger backend listening at http://localhost:${port}`)
})