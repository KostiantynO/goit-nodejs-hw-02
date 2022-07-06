const auth = require('./auth');
const ctrlWrapper = require('./ctrlWrapper');
const { validation, validateContactId } = require('./validation');

module.exports = { auth, ctrlWrapper, validation, validateContactId };
