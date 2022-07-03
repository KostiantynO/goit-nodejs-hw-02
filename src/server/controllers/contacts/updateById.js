const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { sendSuccessCodeData } = require('../../helpers/sendSuccess');
const { OK } = require('../../common/http-codes');

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  await checkResult(updatedContact, id);

  return sendSuccessCodeData(res, OK, updatedContact);
};

module.exports = updateById;
