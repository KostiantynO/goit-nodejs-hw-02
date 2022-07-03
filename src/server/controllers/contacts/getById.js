const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { sendSuccessCodeData } = require('../../helpers/sendSuccess');
const { OK } = require('../../common/http-codes');

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  await checkResult(contact, id);

  return sendSuccessCodeData(res, OK, contact);
};

module.exports = getById;
