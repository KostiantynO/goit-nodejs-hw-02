const { NOT_FOUND, SERVER_ERROR } = require('../../common/http-codes');

const generateRoutingError = (_, res) => {
  res.status(NOT_FOUND).json({ message: 'Not found' });
};

const catchRoutingError = (err, _, res, next) => {
  res.status(SERVER_ERROR).json({
    message: `${err.message}. 1. Check route (url) and method (GET|POST|PUT|PATCH|DELETE); 2. Change JSON content; 3. Check for trailing comma and double quotes.`,
  });
  next();
};

module.exports = {
  generateRoutingError,
  catchRoutingError,
};
