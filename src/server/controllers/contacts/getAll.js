const { Contact } = require('../../models');
const { sendSuccessCodeData } = require('../../helpers/sendSuccess');
const { OK } = require('../../common/http-codes');

const getAll = async (_, res) => {
  const contacts = await Contact.find({}); // empty obj => return all`
  return sendSuccessCodeData(res, OK, contacts);
};

module.exports = getAll;
