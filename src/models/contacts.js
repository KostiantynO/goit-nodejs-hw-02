const fs = require('fs/promises');
const path = require('path');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SUCCESS,
  ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../common/http-codes');
const {v4} = require('uuid');
const filePath = path.join(__dirname, 'contacts.json');

/**
 * @return {[] | {id:string, name:string, email:string, phone:string}[]} contacts array
 */
const getContacts = async () => {
  const buffer = await fs.readFile(filePath);
  const contacts = JSON.parse(buffer);
  return !contacts?.length || !Array.isArray(contacts) ? [] : contacts;
};

/**
 * @param {undefined | string} id
 * @return {undefined | {id:string, name:string, email:string, phone:string}} contact object
 */
const getById = async (id) => {
  if (!id) return;
  const contacts = await getContacts();
  return contacts.find((contact) => contact.id === id);
};

/**
 *
 * @param {[] | {id:string, name:string, email:string, phone:string}[]} contacts array
 */
const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

/**
 * @param {undefined | {id:string, name:string, email:string, phone:string}} newContact object
 */
const appendContact = async (newContact) => {
  const contacts = await getContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
};

const listContacts = async (req, res) => {
  try {
    const contacts = await getContacts();

    res.json({
      status: SUCCESS,
      code: OK,
      data: {result: contacts},
    });
  } catch (error) {
    res.json({
      status: ERROR,
      code: NOT_FOUND,
      message: 'Contacts not found',
    });
  }
};

const getContactById = async (req, res) => {
  const id = req.params.id?.trim();
  if (!id) {
    return res.status(BAD_REQUEST).json({
      status: ERROR,
      code: BAD_REQUEST,
      message: `Expected '/:id'. Received '/${id}'`,
    });
  }

  const contact = await getById(id);
  if (!contact) {
    return res.status(NOT_FOUND).json({
      status: ERROR,
      code: NOT_FOUND,
      message: `Contact with id='${id}' not found`,
    });
  }

  res.json({
    status: SUCCESS,
    code: OK,
    data: {result: contact},
  });
};

const addContact = async (req, res) => {
  const {name, email, phone} = req.body;

  if (!name || !email || !phone) {
    return res.status(BAD_REQUEST).json({
      status: ERROR,
      code: BAD_REQUEST,
      message: `Expected 'name', 'email', 'phone'. Received { ${Object.keys(
        req.body
      ).join(', ')} }`,
    });
  }

  // TODO: connect validation middleware with Joi
  const id = v4();
  const newContact = {name, email, phone, id};

  try {
    await appendContact(newContact);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: ERROR,
      code: INTERNAL_SERVER_ERROR,
      message: 'An error ocurred while writing to a file on server',
    });
  }

  const addedContact = await getById(id);

  if (!addedContact) {
    return res.status(NOT_FOUND).json({
      status: ERROR,
      code: NOT_FOUND,
      message: `The contact with id='${id}' is NOT added`,
    });
  }

  return res.status(CREATED).json({
    status: SUCCESS,
    code: CREATED,
    data: {result: addedContact},
  });
};

// const updateContact = async (id, body) => {};

// const removeContact = async (id) => {};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  // updateContact,
  // removeContact,
};
