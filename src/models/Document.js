const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  date: Date,
  filename: String,
  contentFile: String
});

module.exports = mongoose.model('Document', DocumentSchema);
