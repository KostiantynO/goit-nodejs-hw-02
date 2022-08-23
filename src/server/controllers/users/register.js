const { Conflict } = require('http-errors');
const { url } = require('gravatar');
const { User } = require('../../models');
const { CREATED } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict('Email in use');
  }

  const avatarURL = url(email, null, true);
  const user = new User({ email, avatarURL });
  await user.setPassword(password);
  await user.save();

  const { subscription } = user;

  return resSuccessCodeData(res, CREATED, {
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = register;
