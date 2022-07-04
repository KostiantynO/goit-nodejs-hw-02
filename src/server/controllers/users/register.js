const { Conflict } = require('http-errors');
const { CREATED } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict('Email in use');
  }

  const user = new User({ email });
  await user.setPassword(password);
  await user.save();

  const { subscription } = user;

  return resSuccessCodeData(res, CREATED, {
    user: {
      email,
      subscription,
    },
  });
};

module.exports = register;
