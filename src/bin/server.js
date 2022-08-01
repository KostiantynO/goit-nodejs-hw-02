const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../server/app');
const { SERVER_PORT, logPort, ROUTES } = require('../server/common/config');

const { DB_HOST } = process.env;

const server = async () => {
  let timer = null;

  try {
    timer = setTimeout(() => {
      throw new Error('Please check your internet connection 💁‍♀️🌐');
    }, 7000);

    await mongoose.connect(DB_HOST);
    clearTimeout(timer);
    console.log('Database connection successful ✅');

    app.listen(SERVER_PORT, () => logPort(ROUTES.contacts));
  } catch (error) {
    console.error('Cannot connect to MongoDB:', error);
    clearTimeout(timer);
    process.exitCode = 1;
  }
};

module.exports = server;
