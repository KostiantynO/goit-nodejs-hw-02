const { BAD_REQUEST, ERROR } = require('../common/http-codes');
const { checkId } = require('../helpers/sendError');

const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    error.status = BAD_REQUEST;
    // next(error);

    res.status(BAD_REQUEST).json({
      status: ERROR,
      code: BAD_REQUEST,
      message: error?.message,
    });
  }
};

const validateId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkid = await checkId(id);
    console.log('validateId ~ checkid', checkid);
    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: ERROR,
      code: BAD_REQUEST,
      message: error?.message,
    });
  }
};

module.exports = { validation, validateId };
