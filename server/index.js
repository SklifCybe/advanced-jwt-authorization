const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const errorMiddleware = require('./middelware/error-middleware');

const PORT = process.env.PORT || 5050;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api', require('./routes'));
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(DB_URL);

    app.listen(PORT, () => {
      console.log(`Server has been started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
