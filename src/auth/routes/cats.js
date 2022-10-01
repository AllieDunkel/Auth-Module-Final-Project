'use strict';

const express = require('express');
const { dogsModel, catsModel } = require('../models');

const catsRouter = express.Router();

catsRouter.post('/cats', async (req, res, send) => {
  console.log('checking the req body: ', req.body);

  const newCat = await catsModel.create(req.body);
  res.status(200).send(newCat);
});

catsRouter.get('/cats', async (req, res, next) => {
  let cats = await catsModel.read();
  res.status(200).send(cats);
});

catsRouter.get('/cats/:id', async (req, res, next)=> {
  let { id } = req.params;
  console.log('Checking for Id: ', id);

  let cat = await catsModel.findOne({where: {id: req.params}});
  res.status(200).send(cat);
});

catsRouter.put('/cats/:id', async (req, res, next) => {
  let { id } = req.params;
  let cat = await catsModel.update(req.body, id);
  res.status(200).send(cat);
});

catsRouter.delete('/cats/:id', async (req, res, next) => {
  try{
    let { id } = req.params;
    let message = await catsModel.delete(id);
  }
  catch(err){
    next(err.message);
  }
});

module.exports = catsRouter;