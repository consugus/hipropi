const express = require('express');
const app = express();


// ================================================
//                     ROUTES
// ================================================
app.use ( require('./user-routes') );
app.use ( require('./login-routes') );
app.use ( require('../routes/cotization-routes') )






module.exports = app;