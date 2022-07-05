const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers/resSuccess');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );

  await checkResult(contact, id);

  return resSuccessCodeData(res, OK, { contact });
};

module.exports = updateStatus;
