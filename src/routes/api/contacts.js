const express = require('express');
const {validateAddContact} = require('../../middlewares/contactsMiddleware');
const {
  listContacts,
  getContactById,
  addContact,
  // updateContact,
  // removeContact,
} = require('../../models/contacts');

const router = new express.Router();

router
  .get('/', listContacts)
  .get('/:id', getContactById)
  .post('/', validateAddContact, addContact);
// .put('/:id', updateContact)
// .delete('/:id', removeContact);

module.exports = router;
