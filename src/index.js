require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/tcs', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', emailRoutes);
app.use('/api', documentRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
