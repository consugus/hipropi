const express = require('express');
const app = express();
const { tokenVerify } = require('../middlewares/authentication');
const cotization = require('../services/cotization-service');


// ================================================
//    GET cotization from Alpha Vantage's API
// ================================================

app.get('/cotization', tokenVerify, (req, res) => {

    cotization(req, res);

});



module.exports = app;