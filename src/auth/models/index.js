'use strict';
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const dogsSchema = require('./dogsSchema');
const catsSchema = require('./catsSchema');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

// const sequelize = new Sequelize(DATABASE_URL);

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


const dogsModel = dogsSchema(sequelizeDatabase, DataTypes);
const catsModel = catsSchema(sequelizeDatabase, DataTypes);




module.exports = {
  sequelizeDatabase,
  dogsModel: dogsModel,
  catsModel: catsModel,
  db: sequelizeDatabase,
};