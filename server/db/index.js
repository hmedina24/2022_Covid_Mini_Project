const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://Admin:hdswe2022@cluster0.tcqrk.mongodb.net/hdswetechdive', { useNewUrlParser: true, useFindAndModify: false })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;