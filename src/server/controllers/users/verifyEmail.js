const { Unauthorized } = require('http-errors');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeMessage } = require('../../helpers');
const { User } = require('../../models');
const { isUser } = require('./userObject');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken || verificationToken.length < 36) {
    throw new Unauthorized();
  }

  const user = await User.findOne({ verificationToken });

  isUser(user);

  const { _id, email } = user;

  await User.findByIdAndUpdate(
    _id,
    { verify: true, verificationToken: null },
    { new: true },
  );

  return resSuccessCodeMessage(
    res,
    OK,
    `Email: ${email} verified successfully ✅`,
  );
};

module.exports = verifyEmail;
