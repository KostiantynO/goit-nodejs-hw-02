/*
- [ ] відповідь повина мати статус-код 200
- [ ] у відповіді повинен повертатися токен
- [ ] у відповіді повинен повертатися об'єкт `user` з 2 полями `email` та
      `subscription` з типом даних `String`
*/

const request = require('supertest');

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'testpassword';
const Credentials = { email: TEST_EMAIL, password: TEST_PASSWORD };

const data = { user: Credentials, token: '' };

const { app } = require('../../../../bin/server');

const loginApi = async () =>
  request(app)
    .post('/api/v1/login')
    .send(JSON.stringify(Credentials))
    .expect(200);

const testLoginResponse200OK = async () => {
  const response = await loginApi();
  expect(response).toHaveProperty('body', data);
};

const testLoginHasJSON = async () => {
  const { headers } = await loginApi();
  expect(headers['content-type']).toBe('application/json; charset=utf-8');
};

const testLoginHasToken = async () => {
  const { body } = await loginApi();
  console.log('testLoginHasToken ~ body', body);
  expect(body).toHaveProperty('data');
  expect(body.data).toHaveProperty('token');
  const { token } = body.data;
  expect(typeof token).toBe('string');
};

const testLoginHasUser = async () => {
  const { body } = await loginApi();
  expect(body).toHaveProperty('data');
  expect(body.data).toHaveProperty('user');

  const { user } = body.data;
  expect(user).toEqual({
    email: TEST_EMAIL,
    subscription: TEST_PASSWORD,
  });
};

const testController = () => {
  // beforeAll(startServer);

  it('responds with 200 OK', testLoginResponse200OK);
  it('responds with json', testLoginHasJSON);
  it('req.body has token', testLoginHasToken);
  it('req.body has user object', testLoginHasUser);

  // afterAll(closeServer);
};

describe('POST /api/v1/login', testController);
