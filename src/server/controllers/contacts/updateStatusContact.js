const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { sendSuccessCodeData } = require('../../helpers/sendSuccess');
const { OK } = require('../../common/http-codes');

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const patchedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );

  await checkResult(patchedContact, id);

  return sendSuccessCodeData(res, OK, patchedContact);
};

module.exports = updateStatusContact;
