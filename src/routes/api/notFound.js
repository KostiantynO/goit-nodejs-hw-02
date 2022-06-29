const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../../common/http-codes');

const generateError = (req, res) => {
  res.status(NOT_FOUND).json({ message: 'Not found' });
};

const catchError = (err, req, res, next) => {
  res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = {
  generateError,
  catchError,
};
