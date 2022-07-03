const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { sendSuccessCodeData } = require('../../helpers/sendSuccess');
const { CREATED } = require('../../common/http-codes');

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  await checkResult(newContact, '', 'Contact not added');

  return sendSuccessCodeData(res, CREATED, newContact);
};

module.exports = add;
