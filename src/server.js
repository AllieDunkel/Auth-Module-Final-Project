'use strict';

// 
const express = require('express');
const cors = require('cors');


const errorHandler = require('./error-handlers/500.js');
const notFound = require('/error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Uncomment once you've added in code for the routes folder 

app.use(authRoutes);

app.use(notFound);
app.use(errorHandler);


module.exports = {
  server: app,
  startup: (port)
}
