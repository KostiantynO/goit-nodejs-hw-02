const { Conflict } = require('http-errors');
const { BAD_REQUEST, CREATED } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Conflict('Email in use');
    }

    const user = new User({ email });
    await user.setPassword(password);
    await user.save();

    return await resSuccessCodeData(res, CREATED, {
      user: { email, subscription: user.subscription },
    });
  } catch (error) {
    error.status = BAD_REQUEST;
    return next(error);
  }
};

module.exports = register;
