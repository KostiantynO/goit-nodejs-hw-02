const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, 'contacts.json');

/**
 * @param {[] | {id:string, name:string, email:string, phone:string}[]} contacts
 * array
 */
const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

/**
 * @return {[] | {id:string, name:string, email:string, phone:string}[]}
 * contacts array
 */
const getContacts = async () => {
  const buffer = await fs.readFile(filePath);
  const contacts = JSON.parse(buffer);
  return !contacts?.length || !Array.isArray(contacts) ? [] : contacts;
};

/**
 * @param {undefined | string} id
 * @return {undefined | {id:string, name:string, email:string, phone:string}}
 * contact object
 */
const getById = async (id) => {
  const contacts = await getContacts();
  return contacts.find((contact) => contact.id === id);
};

/**
 * @param {undefined | {id:string, name:string, email:string, phone:string}}
 * newContact object
 */
const appendContact = async (newContact) => {
  const contacts = await getContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
};

/**
 * @param {undefined | {id:string, name:string, email:string, phone:string}}
 * contactUpdate object
 */
const changeContact = async (contactUpdate) => {
  const contacts = await getContacts();
  const newContacts = contacts.map((contact) =>
    contact.id === contactUpdate.id ? {...contact, ...contactUpdate} : contact,
  );
  await updateContacts(newContacts);
};

/**
 * @param {undefined | string} id
 */
const removeById = async (id) => {
  const contacts = await getContacts();
  const newContacts = contacts.filter((contact) => contact.id !== id);
  await updateContacts(newContacts);
};

module.exports = {
  getContacts,
  getById,
  appendContact,
  changeContact,
  removeById,
};
