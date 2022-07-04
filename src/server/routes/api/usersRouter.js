const { Router } = require('express');
const { addUserJoiSchema, loginJoiSchema } = require('../../models');
const { validation, ctrlWrapper } = require('../../middlewares');

const {
  users: { register, login },
} = require('../../controllers');

const router = Router();

router
  .post('/register', validation(addUserJoiSchema), ctrlWrapper(register))
  .post('/login', validation(loginJoiSchema), ctrlWrapper(login));

module.exports = router;
