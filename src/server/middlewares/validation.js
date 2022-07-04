const { BAD_REQUEST } = require('../common/http-codes');
const { checkId } = require('../helpers/sendError');

const validation = (schema) => async (req, _, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    error.status = BAD_REQUEST;
    next(error);
  }
};

const validateId = async (req, _, next) => {
  const { id } = req.params;
  try {
    await checkId(id);
    next();
  } catch (error) {
    error.status = BAD_REQUEST;
    next(error);
  }
};

module.exports = { validation, validateId };
