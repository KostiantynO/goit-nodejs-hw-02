const { Unauthorized } = require('http-errors');
const { sign } = require('jsonwebtoken');
const { User } = require('../../models');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

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

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { token },
    { new: true },
  );

  if (updatedUser.token) {
    throw new Unauthorized('Error while updating token');
  }

  return resSuccessCodeData(res, OK, {
    token,
    user: { email, subscription },
  });
};

module.exports = login;
