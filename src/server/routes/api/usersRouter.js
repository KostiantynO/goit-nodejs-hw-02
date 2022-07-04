const { Router } = require('express');
const { addUserJoiSchema } = require('../../models');
const { validation, ctrlWrapper } = require('../../middlewares');

const {
  users: { register },
} = require('../../controllers');

const router = Router();

router.post('/register', validation(addUserJoiSchema), ctrlWrapper(register));

module.exports = router;
