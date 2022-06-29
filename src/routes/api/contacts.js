const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContactById,
  patchContactById,
} = require('../../controllers/contactsController');

const router = new express.Router();

router
  .get('/', listContacts)
  .get('/:contactId', getContactById)
  .post('/', addContact)
  .put('/:contactId', changeContactById)
  .patch('/:contactId', patchContactById)
  .delete('/:contactId', deleteContact);

module.exports = router;
