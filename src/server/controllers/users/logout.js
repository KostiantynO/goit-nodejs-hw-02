const { User } = require('../../models');
const { NO_CONTENT } = require('../../common/http-codes');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' }, { new: true });
  return res.status(NO_CONTENT).json();
};

module.exports = logout;
