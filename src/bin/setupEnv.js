require('dotenv').config();

const {
  HOST,
  PORT,
  DB_HOST,
  SECRET_KEY,
  TEST_EMAIL,
  TEST_PASSWORD,
  SENDGRID_API_KEY,
  SENDGRID_FROM,
  SENDGRID_ALIAS,
  SENDGRID_PROVIDER,
} = process.env;

if (!HOST || !PORT) {
  throw new Error('Add HOST and PORT for server to .env');
}
if (!DB_HOST) {
  throw new Error('Add DB_HOST for mongoDB to .env');
}
if (!SECRET_KEY) {
  throw new Error('Add SECRET_KEY to .env');
}
if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error('Add TEST_EMAIL and TEST_PASSWORD to .env');
}
if (
  !SENDGRID_API_KEY ||
  !SENDGRID_FROM ||
  !SENDGRID_ALIAS ||
  !SENDGRID_PROVIDER
) {
  throw new Error(
    'Please add SENDGRID_API_KEY, SENDGRID_FROM, SENDGRID_ALIAS and SENDGRID_PROVIDER to .env',
  );
}
