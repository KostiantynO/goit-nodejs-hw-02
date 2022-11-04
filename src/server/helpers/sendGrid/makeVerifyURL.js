const { verifyEmailRoute } = require('../../common/config');

require('dotenv').config();

const { HOST, PORT } = process.env;

const domain = `${HOST}:${PORT}${verifyEmailRoute}`;

/** users/verify/:verificationToken */
const makeVerifyURL = (verificationToken = '') =>
  `${domain}/${verificationToken}`;

module.exports = makeVerifyURL;
