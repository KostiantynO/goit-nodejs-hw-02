const { Unauthorized } = require('http-errors');
const { sign } = require('jsonwebtoken');
const { resSuccessCodeData } = require('../../helpers');
const { OK } = require('../../common/http-codes');
const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.checkPassword(password))) {
    throw new Unauthorized('Email or password is wrong');
  }

  const { _id, subscription } = user;
  const payload = {
    id: _id,
  };

  const token = sign(payload, SECRET_KEY, { expiresIn: '1h' });

  await User.findByIdAndUpdate(_id, { token });

  return resSuccessCodeData(res, OK, {
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
