'use strict';
const base64 = require('base-64');
const middleware = require('../../src/auth/middleware/basic.js');
const { db, users  } = require('../../src/auth/models/index.js');

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {
      const basicAuthString = base64.encode('username:password');

      // Change the request to match this test case
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });
  });
});
