const { Conflict } = require('http-errors');
const { url } = require('gravatar');
const { v4 } = require('uuid');
const { User } = require('../../models');
const { CREATED } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');
const sendEmailVerificationLink = require('../../helpers/sendGrid');

const isRegistered = (existingUser) => {
  if (existingUser) {
    throw new Conflict('Email in use');
  }
};

const saveUserToDB = async ({ email, password }) => {
  const avatarURL = url(email, null, true);

  const user = new User({ email, avatarURL, verificationToken: v4() });
  await user.setPassword(password);
  const saved = await user.save();
  console.log('saveUserToDB ~ saved', saved);
  return saved;
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  isRegistered(existingUser);

  const user = await saveUserToDB({ email, password });
  console.log('register ~ user', user);

  const { subscription, avatarURL, verificationToken } = user;
  console.log(
    'register ~ subscription, avatarURL, verificationToken',
    subscription,
    avatarURL,
    verificationToken,
  );

  await sendEmailVerificationLink({ verificationToken, to: email });

  return resSuccessCodeData(res, CREATED, {
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = register;
