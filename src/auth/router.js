'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('./models');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const permissions = require('./middleware/acl.js');
//define a signup route to create new user in database
router.post('/signup', async (req, res, next) => {
  console.log('I am here');
  try {
    let { username, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);

    console.log({
      username,
      password: encryptedPassword,
    });

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

// router.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
//   const userRecords = await userModel.findAll({});
//   const list = userRecords.map(user => user.username);
//   res.status(200).json(list);
// });

// router.get('/secret', bearerAuth, async (req, res, next) => {
//   res.status(200).send('Welcome to the secret area');
// });



module.exports = router;
