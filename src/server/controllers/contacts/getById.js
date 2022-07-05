const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id).populate(
    'owner',
    '_id email subscription',
  );
  await checkResult(contact, id);

  return resSuccessCodeData(res, OK, { contact });
};

module.exports = getById;
