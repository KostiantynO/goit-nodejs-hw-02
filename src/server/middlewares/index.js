const auth = require('./auth');
const ctrlWrapper = require('./ctrlWrapper');
const { validation, validateId } = require('./validation');

module.exports = { auth, ctrlWrapper, validation, validateId };
