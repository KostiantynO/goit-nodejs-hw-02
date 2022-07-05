const { Router } = require('express');
const { addUserJoiSchema, loginJoiSchema } = require('../../models');
const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { users } = require('../../controllers');

const router = Router();

router
  .post('/register', validation(addUserJoiSchema), ctrlWrapper(users.register))
  .post('/login', validation(loginJoiSchema), ctrlWrapper(users.login))
  .get('/current', auth, ctrlWrapper(users.getCurrent))
  .post('/logout', auth, ctrlWrapper(users.logout));

module.exports = router;
