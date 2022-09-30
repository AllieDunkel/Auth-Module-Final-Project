'use strict';

// both users and index code within the same file.

const { sequelize, DataTypes, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { memoryUsage } = require('process');
// const SECRET = process.env.API_SECRET

const DATABASE_URL = process.env.NODE_ENV === 'test'
? 'sqlite::memory'
: 'sqlite::memory';



let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectedUnauthorized: false,
  },
} : {};

const sequelizeDatabase = new Sequelize(DATABASE_URL, options);

//  File direct route to establish the types of username, password and token. 
const userModel = sequelizeDatabase.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  token: {
    type: DataTypes.VIRTUAL,
    get(){
      return jwt.sign({username: this.username}, process.env.API_SECRET, {expiresIn: '15m'});
    },
    set(){
      return jwt,sign({username: this.usernmame}, process.env.API_SECRET, {expiresIn: '15m'});
    }
  },
});

userModel.authenticateBearer = async (token) => {
  try{
    let payload = jwt.verify(token, process.env.API_SECRET);

    const user = await this.findOne({where: {username: payload.username}});
    if(user){
      return user;
    }
  }
  catch (e){
    console.error(e);
    return e;
  }
};


module.exports = {
  userModel,
  db: sequelize,
  sequelizeDatabase,
};