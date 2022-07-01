const {NOT_FOUND, SERVER_ERROR} = require('../../common/http-codes');

const generateRoutingError = (req, res) => {
  res.status(NOT_FOUND).json({message: 'Not found'});
};

const catchRoutingError = (err, req, res, next) => {
  res.status(SERVER_ERROR).json({
    message: `${err.message}. Invalid JSON, check commas or quotes`,
  });
  next();
};

module.exports = {
  generateRoutingError,
  catchRoutingError,
};
