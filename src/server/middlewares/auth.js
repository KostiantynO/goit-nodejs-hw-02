const { Unauthorized } = require('http-errors');
const { verify } = require('jsonwebtoken');
const { User } = require('../models');
const { UNAUTHORIZED } = require('../common/http-codes');
const { ROUTES } = require('../common/config');

const { SECRET_KEY } = process.env;

const unauthorizedMessage = `Not authorized. Please login at route: POST ${ROUTES.users}/login`;

/** helper
 * @returns token */
const isToken = (authorization = '') => {
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw new Unauthorized(unauthorizedMessage);
  }
  return token;
};

/** helper checks if token equal to user.token from DB */
const isSameToken = (user, token) => {
  if (!user || user.token !== token) {
    throw new Unauthorized('Not authorized');
  }
};

const auth = async (req, _, next) => {
  const { authorization = '' } = req.headers;

  try {
    const token = isToken(authorization);

    const { id } = verify(token, SECRET_KEY);
    const user = await User.findById(id);

    isSameToken(user, token);

    req.user = user;
    return await next();
  } catch (error) {
    error.status = UNAUTHORIZED;

    return next(error);
  }
};

module.exports = auth;
