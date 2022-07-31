const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { ROUTES } = require('./common/config');
const { routeNotFound, catchError } = require('./routes/api/notFound');

const usersRouter = require('./routes/api/usersRouter');
const contactsRouter = require('./routes/api/contactsRouter');
const { publicDir } = require('./common/paths');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(publicDir))

app.use(ROUTES.users, usersRouter);
app.use(ROUTES.contacts, contactsRouter);

app.use(routeNotFound);
app.use(catchError);

module.exports = app;
