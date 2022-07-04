const { User, addUserJoiSchema } = require('./users');

const {
  Contact,
  addContactJoiSchema,
  favoriteJoiSchema,
} = require('./contacts');

module.exports = {
  User,
  addUserJoiSchema,

  Contact,
  addContactJoiSchema,
  favoriteJoiSchema,
};
