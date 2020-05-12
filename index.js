const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const { mongoose } = require('./db.js');
var studentController = require('./controller/studentController.js');

var app = express();

app.use(cors())

app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started at port: 3000'));

//Define routes
app.use('/students', studentController);