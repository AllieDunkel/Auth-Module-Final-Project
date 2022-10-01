'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('../src/auth/models/users-model');
const basicAuth = require('../src/auth/middleware/basic');
const bearerAuth = require('../src/auth/middleware/bearer');

//define a signup route to create new user in database
router.post('/signup', async (req, res, next) => {
  try {
    let { username, password, role } = req.body;
    let encryptPassword = await bcrypt.hash(password ,5);
    let user;
    if(!['user', 'writer', 'editor', 'admin'].includes(role)){
      next('role not correct');
    } else{
      user = await userModel.create ({ // not sure if usermodel needs to be here or if it needs to be cat/dog
      
      username,
      password: encryptPassword,
      role,
      });
    }

    res.status(200).send(user);
  } catch(err) {
    next('signup error occured');
  }
});

//define a signin route to returns user to client (confirm user auth)
router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;
