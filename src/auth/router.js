'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('./models/users-model');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');

//define a signup route to create new user in database
router.post('/signup', async (req, res, next) => {
  console.log('I am here');
  try {
    let { username, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);

    let user = await userModel.create({
      username,
      password: encryptedPassword,
    });

    res.status(200).send(user);
  } catch (err) {
    next('signup error occurred');
  }
});

//define a signin route to returns user to client (confirm user auth)
router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;
