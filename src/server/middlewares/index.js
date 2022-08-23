const auth = require('./auth');
const wrapper = require('./wrapper');
const { validation, validateContactId } = require('./validation');
const upload = require('./upload');
const formatImage = require('./formatImage');

module.exports = {
  auth,
  wrapper,
  validation,
  validateContactId,
  upload,
  formatImage,
};
