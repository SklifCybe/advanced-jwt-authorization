const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const DB_URL = process.env.DB_URL;
const app = express();

app.use('/api', require('./routes'));

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
