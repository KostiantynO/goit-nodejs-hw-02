const { Router } = require('express');
const model = require('../../models');
const {
  validation,
  wrapper,
  auth,
  upload,
  formatImage,
} = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const checkSingUp = validation(model.addUserJoiSchema);
const checkEmail = validation(model.verificationEmailJoiSchema);
const checkLogin = validation(model.loginJoiSchema);
const checkSubscription = validation(model.subscriptionJoiSchema);

const router = Router();

// '/api/v1/users';
const users = {
  register: '/register',
  verify: {
    index: '/verify',
    verificationToken: '/verify/:verificationToken',
  },

  login: '/login',
  current: '/current',

  index: '/',
  avatars: '/avatars',
  logout: '/logout',
};

const avatar = upload.single('avatar');

router
  // new user
  .post(users.register, checkSingUp, wrapper(ctrl.register))
  .post(users.verify.index, checkEmail, wrapper(ctrl.resendVerificationEmail))
  // http://localhost:3000/api/v1/users/verify/10b7bd0f-8eaf-4100-b388-d2e04a6150ca
  .get(users.verify.verificationToken, wrapper(ctrl.verifyEmail))
  .post(users.login, checkLogin, wrapper(ctrl.login))

  // existing user
  .get(users.current, auth, wrapper(ctrl.getCurrent))
  .patch(users.index, auth, checkSubscription, wrapper(ctrl.updateSubscription))
  .patch(users.avatars, auth, avatar, formatImage, wrapper(ctrl.updateAvatar))
  .post(users.logout, auth, wrapper(ctrl.logout));

module.exports = router;
