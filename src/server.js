'use strict';

// 3rd party and route files
const express = require('express');
const basicAuth = require('./auth/middleware/basic');
const bearerAuth = require('./auth/middleware/bearer');
const { userModel } = require('./auth/models/usersSchema');
const app = express();
const dogsRouter = require('./auth/routes/dogs');
const catsRouter = require('./auth/routes/cats');
const router = require('./auth/router');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Uncomment once you've added in code for the routes folder 
app.use(router);
app.use(dogsRouter);
app.use(catsRouter);
// app.use(notFound);
// app.use(errorHandler);

// creating hello route: 

app.get('/welcome', basicAuth, (req, res, next) => {
  let { name } = req.query;
  res.status(200).send(`Welcome ${name}, this route is secured using Basic Auth!!`);
});

app.get('/users', bearerAuth, async (req, res, next) => {
  let user = await userModel.findAll();
  let payload = {
    results: user,
  };
  res.status(200).send(payload);
});

module.exports = {
  server: app,
  start: (PORT) => app.listen(PORT, '127.0.0.1',  console.log('server is running on', PORT)),
};
