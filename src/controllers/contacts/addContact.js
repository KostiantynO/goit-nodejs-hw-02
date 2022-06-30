const {v4} = require('uuid');
const {getById, appendContact} = require('../../models/contacts/writeToFile');
const {createSuccess, createError} = require('./responseHelpers');
const {CREATED, NOT_FOUND, SERVER_ERROR} = require('../../common/http-codes');

const addContact = async (req, res) => {
  const {name, email, phone} = res.locals.newContact;

  const id = v4();
  const newContact = {name, email, phone, id};

  try {
    await appendContact(newContact);
    const addedContact = await getById(id);
    if (!addedContact) {
      return createError(res, NOT_FOUND, `Cannot find new contact id='${id}'`);
    }

    createSuccess(res, CREATED, addedContact);
  } catch (error) {
    return createError(res, SERVER_ERROR, `Cannot add new contact id='${id}'`);
  }
};

module.exports = addContact;
