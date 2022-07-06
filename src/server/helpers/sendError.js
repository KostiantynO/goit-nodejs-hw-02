const { BadRequest, NotFound } = require('http-errors');

const checkId = async (id = '') => {
  await null;

  if (!id.trim() || id.trim() !== decodeURIComponent(id)) {
    throw new BadRequest(`Expected '/:_id' from mongoDB. Received: '${id}'`);
  }
};

const checkResult = async (
  result,
  id = '',
  message = `Contact with _id='${id}' not found`,
) => {
  if (!result) {
    throw new NotFound(message);
  }
};
module.exports = {
  checkId,
  checkResult,
};
