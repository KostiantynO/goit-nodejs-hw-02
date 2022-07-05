const { NO_CONTENT } = require('../../common/http-codes');
const { User } = require('../../models');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  return res.status(NO_CONTENT).json();
};

module.exports = logout;
