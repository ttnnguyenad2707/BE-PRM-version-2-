require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2;
const { SERVER_PORT, MONGOODB_URL, SOCKETIO_PORT } = process.env;
const { Server } = require("socket.io")
const socket = require("socket.io");
const socketIO = require("../config/socketIO");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  '/api/v1',
  require('./routes')
);


const startServer = async () => {
  try {
    await mongoose.connect(MONGOODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(">>> Connected to MongoDB");

    const s = app.listen(SERVER_PORT || 5000, () => {
      console.log(`>>> Listening on port ${SERVER_PORT || 5000}`);
    });     
    socketIO(s);
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

startServer();
