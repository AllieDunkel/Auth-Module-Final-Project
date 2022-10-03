'use strict';

const { db } = require('../../src/auth/models');
const supertest = require('supertest');
const { describe } = require('yargs');
const server = require('../../src/server.js').server;

const mockRequest = supertest(server);

let userData = {
  testUser: { username: 'username', password: 'password' },
};
let accessToken = null;

describe('Auth Router', () => {
  it ('can create a new user', async () => {
    const response = await mockRequest.post('/signup').send(userData.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userData.testUser.username);
  });

  it ('Can signin with basic auth string', async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post('/signin').auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });

  it ('Can signin with bearer auth token', async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post('/signin').auth(username, password);
    accessToken = response.body.token;

    const bearerResponse = await mockRequest.get('/users').set('Authorization', `Bearer: ${accessToken}`);

    expect(bearerResponse.status).toBe(200);
  });

  it('Succeeds with a valid token', async () => {

    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual(expect.anything());
  });


});
