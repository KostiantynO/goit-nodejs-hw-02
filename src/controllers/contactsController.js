const listContacts = async (req, res, next) => {
  // для роботи з json-файлом contacts.json
  // повертає масив всіх контактів в json-форматі зі статусом 200
  const contacts = [];
  res.json({data: {result: contacts}});
};
const getContactById = async (req, res, next) => {
  res.json({message: 'template message'});
};
const addContact = async (req, res, next) => {
  res.json({message: 'template message'});
};
const changeContactById = async (req, res, next) => {
  res.json({message: 'template message'});
};
const patchContactById = async (req, res, next) => {
  res.json({message: 'template message'});
};
const deleteContact = async (req, res, next) => {
  res.json({message: 'template message'});
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContactById,
  deleteContact,
};
