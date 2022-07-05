const { Unauthorized } = require('http-errors');
const { verify } = require('jsonwebtoken');
const { User } = require('../models');
const { UNAUTHORIZED } = require('../common/http-codes');

const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer' || !token) {
      throw new Unauthorized('Not authorized');
    }

    const { id } = verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    return await next();
  } catch (error) {
    if (error.name === 'JSONWebTokenError') {
      error.status = UNAUTHORIZED;
    }
    return next(error);
  }
};

module.exports = auth;
