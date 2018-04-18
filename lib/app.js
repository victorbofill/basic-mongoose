const express = require('express');
const app = express();
const friends = require('./routes/friends');

app.use(express.json());

app.use('/friends', friends);

module.exports = app;