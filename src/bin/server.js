require('dotenv').config();
require('./setupEnv');

const mongoose = require('mongoose');
const app = require('../server/app');
const { SERVER_PORT, logPort, ROUTES } = require('../server/common/config');

const { DB_HOST } = process.env;

let serverInstance = {};

const server = async () => {
  let timer = null;

  try {
    timer = setTimeout(() => {
      throw new Error('Please check your internet connection 💁‍♀️🌐');
    }, 7000);

    await mongoose.connect(DB_HOST);
    clearTimeout(timer);
    console.log('Database connection successful ✅');

    serverInstance = app.listen(SERVER_PORT, () => logPort(ROUTES.contacts));
  } catch (error) {
    console.error('Cannot connect to MongoDB:', error);
    clearTimeout(timer);
    process.exitCode = 1;
  }
};

module.exports = { server, serverInstance, app };
