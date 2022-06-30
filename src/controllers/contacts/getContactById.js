const {getById} = require('../../models/contacts/writeToFile');
const {createSuccess, createError} = require('./responseHelpers');
const {OK, NOT_FOUND, SERVER_ERROR} = require('../../common/http-codes');

const getContactById = async (req, res) => {
  const id = req.params.id?.trim();
  if (!id) {
    return createError(res, NOT_FOUND, `Expected '/:id'. Received '/${id}'`);
  }

  try {
    const contact = await getById(id);
    if (!contact) {
      return createError(res, NOT_FOUND, `Contact not found, id='${id}'`);
    }

    createSuccess(res, OK, contact);
  } catch (error) {
    console.log(error);
    createError(res, SERVER_ERROR, `Error while finding contact by id='${id}'`);
  }
};

module.exports = getContactById;
