const { getContacts } = require('../models/contacts/writeToFile');
const { createSuccess, createError } = require('./responseHelpers');
const { OK, NOT_FOUND } = require('../common/http-codes');

const listContacts = async (req, res) => {
  try {
    const contacts = await getContacts();
    createSuccess(res, OK, contacts);
  } catch (error) {
    createError(res, NOT_FOUND, 'Contacts not found');
  }
};

module.exports = listContacts;
