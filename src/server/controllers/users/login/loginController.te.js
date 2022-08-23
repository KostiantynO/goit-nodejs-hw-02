// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const app = require('../../../app');
const { loginRoute } = require('../../../common/config');
require('dotenv').config();

const { TEST_EMAIL, TEST_PASSWORD } = process.env;

const OK = 200;

const postLogin  = async () => {
  const { statusCode } = await request(app).post(loginRoute).send({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  expect(statusCode).toBe(OK);
};

const respondWith200StatusCode = async () => {
  await postLogin();
};

const givenEmailAndPassword = () => {
  // should check in DB, if such email exists, and check if provided password is the same as salted password in the database.

  // should respond with a json containing the user object: { token, email, subscription }

  test('should respond with a 200 status code', respondWith200StatusCode);

  // should specify json in the content type header
};

// const missingEmailAndPassword = () => {
//   // should respond with a status code of 400
// };

const usersTests = () => {
  describe('given a username and password', givenEmailAndPassword);
  // describe('when username and password is missing', missingEmailAndPassword);
};

describe('POST /users', usersTests);
