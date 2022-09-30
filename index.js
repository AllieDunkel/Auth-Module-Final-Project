'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models/users-model');
const app = require('./src/server.js');
// const app = require('./auth-server/src/server.js');
// const { db } = require('./auth-server/src/auth/models');
const PORT = process.env.PORT || 3002;

// db.sync().then(() => {
// });
app.start(PORT);