const { SUCCESS } = require('../common/http-codes');

/**
 * @param {Response} res Express 'response' object
 * @param {number} code of http response
 * @param {undefined | {message?: string;}|{user?: object;}|
 * {message: string; user: object;}|{token: string;}} data 'payload' object
 */
const resSuccessCodeData = async (res, code, data) => {
  res.status(code).json({ status: SUCCESS, code, data });
};

module.exports = {
  resSuccessCodeData,
};
