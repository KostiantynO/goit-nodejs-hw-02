const { NotFound } = require('http-errors');

const isUser = (user) => {
  if (!user) {
    throw new NotFound('User not found');
  }
};

module.exports = {
  isUser,
};
