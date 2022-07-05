const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { CREATED } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  await checkResult(contact, '', 'Contact not added');

  return resSuccessCodeData(res, CREATED, { contact });
};

module.exports = add;
