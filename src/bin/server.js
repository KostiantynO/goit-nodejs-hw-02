const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../server/app');
const { SERVER_PORT, logPort, ROUTES } = require('../server/common/config');

const { DB_HOST } = process.env;

const server = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Database connection successful');

    app.listen(SERVER_PORT, () => logPort(ROUTES.contacts));
  } catch (error) {
    console.error('Cannot connect to MongoDB:', error);
    process.exitCode = 1;
  }
};

module.exports = server;
