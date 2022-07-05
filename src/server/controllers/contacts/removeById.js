const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

const removeById = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndRemove(id);
  await checkResult(contact, id);

  return resSuccessCodeData(res, OK, { message: 'Contact removed', contact });
};

module.exports = removeById;
