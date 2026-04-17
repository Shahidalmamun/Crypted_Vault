const express = require('express');
const app = express();
const cors = require('cors');
const authenticationRoutes = require('./routes/authentication');
const uploadImageRoutes = require('./routes/uploadImageRoutes');
const getImageRoute = require('./routes/getImageRoute');

app.use(cors());
app.use(express.json());

app.use('/api', authenticationRoutes);
app.use('/api', uploadImageRoutes);
app.use('/api', getImageRoute);

module.exports = app;