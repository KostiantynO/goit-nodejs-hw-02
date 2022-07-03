const { getById, changeContact } = require('../models/contacts/writeToFile');
const { createSuccess, createError } = require('./responseHelpers');
const { OK, NOT_FOUND, SERVER_ERROR } = require('../common/http-codes');

const updateContact = async (req, res) => {
  const id = req.params.id?.trim();
  if (!id) {
    return createError(res, NOT_FOUND, `Expected '/:id'. Received '/${id}'`);
  }

  try {
    const contact = await getById(id);
    if (!contact) {
      return createError(res, NOT_FOUND, `Contact not found, id='${id}'`);
    }

    const { name, email, phone } = res.locals.contactUpdate;
    const contactUpdate = { name, email, phone, id };
    await changeContact(contactUpdate);
    const modifiedContact = await getById(id);

    if (!modifiedContact) {
      return createError(res, NOT_FOUND, `No edited contact, id='${id}'`);
    }

    return createSuccess(res, OK, modifiedContact);
  } catch (error) {
    return createError(
      res,
      SERVER_ERROR,
      `Error when updating contact by id='${id}' ${error}`,
    );
  }
};

module.exports = updateContact;
