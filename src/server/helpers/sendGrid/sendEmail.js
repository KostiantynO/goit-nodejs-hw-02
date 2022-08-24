const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, SENDGRID_ALIAS, SENDGRID_FROM, SENDGRID_PROVIDER } =
  process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async ({
  provider = '',
  to = '',
  subject = '',
  html = '',
}) => {
  if (!provider || !to || !subject || !html) {
    throw new Error('Required: provider, to, subject, html');
  }

  switch (provider) {
    case SENDGRID_PROVIDER: {
      const email = {
        to,
        from: `${SENDGRID_ALIAS} <${SENDGRID_FROM}>`,
        subject,
        html,
      };
      await sgMail.send(email);
      console.log('email sent ✅');
      break;
    }

    default: {
      console.error('Now only 1 supported provider: "sendGrid"');
      break;
    }
  }
};

module.exports = sendEmail;
