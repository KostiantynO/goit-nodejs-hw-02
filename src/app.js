const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const {ROUTES} = require('./common/config');
const notFound = require('./routes/api/notFound');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(ROUTES.contacts, contactsRouter);

app.use(notFound.generateError);
app.use(notFound.catchError);

module.exports = app;
