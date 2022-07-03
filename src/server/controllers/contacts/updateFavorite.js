const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { sendSuccessCodeData } = require('../../helpers/sendSuccess');
const { OK } = require('../../common/http-codes');

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const patchedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );

  await checkResult(patchedContact, id, `Contact with _id='${id}' not patched`);

  return sendSuccessCodeData(res, OK, patchedContact);
};

module.exports = updateFavorite;
