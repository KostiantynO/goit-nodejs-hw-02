const register = require('./register');
const resendVerificationEmail = require('./resendVerificationEmail');
const verifyEmail = require('./verifyEmail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const logout = require('./logout');

module.exports = {
  register,
  resendVerificationEmail,
  verifyEmail,
  login,
  getCurrent,
  updateSubscription,
  updateAvatar,
  logout,
};
