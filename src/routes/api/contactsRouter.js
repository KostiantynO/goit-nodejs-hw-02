const express = require('express');
const {
  validateAddContact,
  validateChangeContact,
} = require('../../middlewares/validation');

const contactsRouter = new express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../controllers/contacts');

contactsRouter
  .get('/', listContacts)
  .get('/:id', getContactById)
  .post('/', validateAddContact, addContact)
  .put('/:id', validateChangeContact, updateContact)
  .delete('/:id', removeContact);

const exitProcessOnError = (err) => {
  console.error('There was an uncaught error:', {err});
  process.exitCode = 1;
};

module.exports = {contactsRouter, exitProcessOnError};
