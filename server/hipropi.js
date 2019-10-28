require('./config/config');
const colors = require('colors');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
var rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const app = express();

let logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating write stream
let accessLogStream = rfs( 'invest-api.log', { interval: '1d', path: logDirectory });

// Setup a logger
app.use( morgan('combined', {stream: accessLogStream}) );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ================================================
//                    Routes
// ================================================

app.use( require('./routes/routes') );







app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`.cyan);
});