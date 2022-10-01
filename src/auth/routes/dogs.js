'use strict';

const express = require('express');
const { dogsModel, catsModel } = require('../models');

const dogsRouter = express.Router();

dogsRouter.post('/dogs', async (req, res, send) => {
  console.log('req body', req.body);

  const newDog = await dogsModel.create(req.body);
  res.status(200).send(newDog);
});

dogsRouter.get('/dogs', async (req, res, next) => {
  let dogs = await dogsModel.read();
  res.status(200).send(dogs);
});

dogsRouter.get('/dogs/:id', async (req, res, next) =>{
  let { id } = req.params;
  console.log('Checking for Id: ', id);

  let dog = await dogsModel.findOne({where: {id: req.params}});
  res.status(200).send(dog);
});

dogsRouter.put('/dogs/:id', async (req, res, next) => {
  let { id } = req.params;
  let dog = await dogsModel.update(req.body, id);
  res.status(200).send(dog);
});


dogsRouter.delete('/dogs/:id', async (req, res, next) => {
  try{
    let { id } = req.params;
    let message = await dogsModel.delete(id);
  }
  catch(err){
    next(err.message);
  }
});

module.exports = dogsRouter;