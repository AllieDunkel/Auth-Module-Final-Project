'use strict';

function logger (req, res, next){
  console.log(`THIS IS THE REQUEST: ${req.method}, ${req.originalUrl}`);
  next();
}

module.exports = logger;