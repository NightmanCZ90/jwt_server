const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// DB Setup
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.a0hh5.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`

// App Setup
app.use(morgan('combined'))
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }))
router(app)


mongoose.connect(MONGODB_URI)
.then(result => {
  console.log('Connected!')

    // Server Setup
    const port = process.env.PORT || 3090
    const server = http.createServer(app)
    server.listen(port)
    console.log('Server listening on:', port)
  })
  .catch(err => console.log(err));