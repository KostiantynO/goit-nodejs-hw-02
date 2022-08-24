const { Unauthorized } = require('http-errors');
const { sign } = require('jsonwebtoken');
const { User } = require('../../../models');
const { OK } = require('../../../common/http-codes');
const { resSuccessCodeData } = require('../../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.verify || !(await user.checkPassword(password))) {
    throw new Unauthorized('Wrong credentials, or user is not verified');
  }

  const { _id, subscription } = user;
  const payload = {
    id: _id,
  };

  const token = sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(_id, { token }, { new: true });

  return resSuccessCodeData(res, OK, {
    token,
    user: { email, subscription },
  });
};

module.exports = login;
