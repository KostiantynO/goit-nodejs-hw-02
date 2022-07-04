const { NOT_FOUND, SERVER_ERROR, ERROR } = require('../../common/http-codes');

const routeNotFound = (_, res) => {
  res.status(NOT_FOUND).json({ message: 'Not found' });
};

// eslint-disable-next-line no-unused-vars
const catchError = (err, _, res, next) => {
  console.log('catchError ~ err', err);
  const { status = SERVER_ERROR, message = 'Server error' } = err;

  res.status(status).json({
    status: ERROR,
    code: status,
    message,
  });
};

module.exports = {
  routeNotFound,
  catchError,
};
