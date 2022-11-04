const { BadRequest, NotFound } = require('http-errors');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeMessage } = require('../../helpers');
const sendEmailVerificationLink = require('../../helpers/sendGrid');
const { User } = require('../../models');

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound('User not found');
  }

  const { verificationToken } = user;

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  await sendEmailVerificationLink({ verificationToken, to: email });

  return resSuccessCodeMessage(
    res,
    OK,
    `Verification email sent to ${email} ✅`,
  );
};

module.exports = resendVerificationEmail;
