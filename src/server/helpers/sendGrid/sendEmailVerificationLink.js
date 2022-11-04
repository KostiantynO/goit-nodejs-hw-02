const sendGridEmailTemplate = require('./sendGridEmailTemplate');
const makeVerifyURL = require('./makeVerifyURL');
const sendEmail = require('./sendEmail');
require('dotenv').config();

const { SENDGRID_PROVIDER } = process.env;

const isTokenAndEmail = ({ verificationToken, to }) => {
  if (!verificationToken || !to) {
    throw new Error('Please provide verificationToken and email');
  }
};

const sendEmailVerificationLink = async ({ verificationToken, to }) => {
  isTokenAndEmail({ verificationToken, to });

  const verificationURL = makeVerifyURL(verificationToken);

  await sendEmail({
    provider: SENDGRID_PROVIDER,
    to,
    subject: 'Please Verify Your Email',
    html: sendGridEmailTemplate(verificationURL),
  });
};

module.exports = sendEmailVerificationLink;
