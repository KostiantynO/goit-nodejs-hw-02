const { BAD_REQUEST } = require('../common/http-codes');

const ctrlWrapper = (ctrl) => async (req, res, next) => {
  try {
    return await ctrl(req, res, next);
  } catch (error) {
    error.status = BAD_REQUEST;
    return next(error);
  }
};

module.exports = ctrlWrapper;
