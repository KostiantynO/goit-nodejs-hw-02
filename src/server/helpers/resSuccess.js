const { SUCCESS } = require('../common/http-codes');

/**
 * @param {Response} res Express 'response' object
 * @param {number} code code of http response
 * @param {undefined | {message?: string;}|{user?: object;}|
 * {message: string; user: object;}|{token: string;}} data 'payload' object
 */
const resSuccessCodeData = async (res, code, data) =>
  res.status(code).json({ status: SUCCESS, code, data });

/**
 * @param {Response} res Express 'response' object
 * @param {number} code code of http response
 * @param {undefined | {message?: string;}} message 'payload' object
 */
const resSuccessCodeMessage = async (res, code, message) =>
  res.status(code).json({ status: SUCCESS, code, message });

module.exports = {
  resSuccessCodeData,
  resSuccessCodeMessage,
};
