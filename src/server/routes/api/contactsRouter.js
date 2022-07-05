const { Router } = require('express');

const {
  addContactJoiSchema,
  favoriteJoiSchema,
} = require('../../models/contacts');
const {
  auth,
  validation,
  validateContactId,
  ctrlWrapper,
} = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers');

const validateBody = validation(addContactJoiSchema);
const isFav = validation(favoriteJoiSchema);
const isId = ctrlWrapper(validateContactId);

const router = Router();

router
  .get('/', auth, ctrlWrapper(ctrl.getAll))
  .post('/', auth, validateBody, ctrlWrapper(ctrl.add))
  .get('/:id', auth, isId, ctrlWrapper(ctrl.getById))
  .put('/:id', auth, isId, validateBody, ctrlWrapper(ctrl.updateById))
  .patch('/:id/favorite', auth, isId, isFav, ctrlWrapper(ctrl.updateStatus))
  .delete('/:id', auth, isId, ctrlWrapper(ctrl.removeById));

module.exports = router;
