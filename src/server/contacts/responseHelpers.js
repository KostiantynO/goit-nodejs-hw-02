const { SUCCESS, ERROR } = require('../common/http-codes');

/**
 * @param {object} res express response
 * @param {number} code of http response
 * @param {string} message - error description
 * @return {object} response function call
 */
const createError = (res, code, message) =>
  res.status(code).json({ status: ERROR, code, message });

/**
 * @param {object} res express response
 * @param {number} code of http response
 * @param {Array|object} result - data
 * @return {object} response function call
 */
const createSuccess = (res, code, result) =>
  res.status(code).json({ status: SUCCESS, code, data: { result } });

/**
 * @param {object} res express response
 * @param {number} code of http response
 * @param {string} message
 * @return {object} response function call
 */
const createSuccessMessage = (res, code, message) =>
  res.status(code).json({ status: SUCCESS, code, message });

module.exports = {
  createSuccess,
  createSuccessMessage,
  createError,
};
