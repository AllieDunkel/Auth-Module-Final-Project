'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userModel } = require('../models/usersSchema.js');

//Define basicAuth Middleware.
// Implement on basic-auth-secured routes only
async function basicAuth(req, res, next) {
  let { authorization } = req.headers;
  console.log('authorization:', authorization);
  //confirm request header has an authorization property
  if (!authorization) {
    res.status(401).send('Not Authorization');
  } else {
    // parse the basic auth string
    let authString = authorization.split(' ')[1];
    console.log('authstr:', authString);
    let decodedAuthString = base64.decode(authString);
    console.log('decodedAuthString:', decodedAuthString); //test:pass
    let [username, password] = decodedAuthString.split(':');
    console.log('username:', username);
    console.log('password:'.password);
    //find the user in the database
    let user = await userModel.findOne({ where: { username } });
    console.log('user:', user);
    //If the user exists (in database after a signup request)...
    if (user) {
      //compare password from database to the signin password
      //note: password could also be sent from a logged in client
      let validUser = await bcrypt.compare(password, user.password);
      console.log('validUser', validUser);
      //if valid user does exist...
      if (validUser) {
        //attach user to the request object
        req.user = user;
        //basicAuth middleware is done, pass request to nest middleware
        next();
        //if valid user does not exist...
      } else {
        //send a "not authorized" error to express middleware
        next('Not Authorized');
      }
    }
  }
}
module.exports = basicAuth;
