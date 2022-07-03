const { SUCCESS } = require('../common/http-codes');

const sendSuccessCodeData = (res, code, result) => {
  res.status(code).json({ status: SUCCESS, code, data: { result } });
};

const sendSuccessCodeMessage = (res, code, message) => {
  res.status(code).json({ status: SUCCESS, code, message });
};

module.exports = {
  sendSuccessCodeData,
  sendSuccessCodeMessage,
};

// dotenv env-cmd cross-env
