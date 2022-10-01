'use strict';

const express = require('express');
const { dogsSchema, catsSchema } = require('../models');

const router = express.Router();

router.post('/dogs', async (req, res, send) => {
  console.log('req body', req.body);

  // const newDog = await dogs
});