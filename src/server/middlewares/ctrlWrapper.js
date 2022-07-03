const { BAD_REQUEST, ERROR } = require('../common/http-codes');

const ctrlWrapper = (ctrl) => async (req, res, next) => {
  try {
    return await ctrl(req, res, next);
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: ERROR,
      code: BAD_REQUEST,
      message: error?.message,
    });
  }
};

module.exports = ctrlWrapper;
