const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { CREATED } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

const add = async (req, res) => {
  const { _id } = req.user;
  const contact = await (
    await Contact.create({ ...req.body, owner: _id })
  ).populate('owner', '_id email subscription');
  await checkResult(contact, '', 'Contact not added');

  return resSuccessCodeData(res, CREATED, { contact });
};

module.exports = add;
