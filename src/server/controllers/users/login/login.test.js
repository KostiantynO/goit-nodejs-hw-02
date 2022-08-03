/*
- [ ] відповідь повина мати статус-код 200
- [ ] у відповіді повинен повертатися токен
- [ ] у відповіді повинен повертатися об'єкт `user` з 2 полями `email` та
      `subscription` з типом даних `String`
*/

const express = require('express');
const request = require('supertest');
const login = require('./login');
require('dotenv').config();

const { PORT } = process.env;

const app = express();
app.post('/api/v1/login', login);

let server = {};

const startServer = () => {
  server = app.listen(PORT);
};

const closeServer = () => {
  server.close();
};

const testLogin = async () => {
  const { status, body } = await request(app).post('/api/v1/login');
  expect(status).toBe(200);

  const { token } = body.data;

  expect(typeof token).toBe('string');
};

const testController = () => {
  beforeAll(startServer);
  afterAll(closeServer);
  test('testLogin', testLogin);
};

describe('Test login controller', testController);
