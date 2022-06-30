const {getById, removeById} = require('../../models/contacts/writeToFile');
const {createError, createSuccessMessage} = require('./responseHelpers');
const {OK, NOT_FOUND, SERVER_ERROR} = require('../../common/http-codes');

const removeContact = async (req, res) => {
  const id = req.params.id?.trim();
  if (!id) {
    return createError(res, NOT_FOUND, `Expected '/:id'. Received '/${id}'`);
  }

  try {
    const contact = await getById(id);
    if (!contact) {
      return createError(res, NOT_FOUND, `Contact not found, id='${id}'`);
    }

    await removeById(id);
    const isExist = await getById(id);
    if (isExist) {
      return createError(res, SERVER_ERROR, `Contact still exists, id='${id}'`);
    }

    createSuccessMessage(res, OK, 'contact deleted');
  } catch (error) {
    createError(res, SERVER_ERROR, `Error when removing contact by id='${id}'`);
  }
};

module.exports = removeContact;
