const { Router } = require('express');
const { users: model } = require('../../models');
const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const validateRegister = validation(model.addUserJoiSchema);
const validateLogin = validation(model.loginJoiSchema);
const validateSubscription = validation(model.subscriptionJoiSchema);
const router = Router();

router
  .post('/register', validateRegister, ctrlWrapper(ctrl.register))
  .post('/login', validateLogin, ctrlWrapper(ctrl.login))
  .get('/current', auth, ctrlWrapper(ctrl.getCurrent))
  .patch('/', auth, validateSubscription, ctrlWrapper(ctrl.updateSubscription))
  .post('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
