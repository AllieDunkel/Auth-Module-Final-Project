'use strict';

const { userModel } = require('../src/auth/models/users-model');

module.exports = async (req, res, next) => {
    if(!req.headers.authorization) {
        next('Invalid Login');
    } else {
        try {
            let token = req.headers.authorization.split(' ').pop();
            console.log('from bearer middleware', token);

            let validUser = userModel.authorization(token);
            if(validUser) {
                req.user = validUser;
                next();
            }
        } catch (e) {
            console.error(e);
            next(e.message);
        }
    }
};
