const { Router } = require('express');
const model = require('../../models');
const {
  auth,
  validation,
  validateContactId,
  wrapper,
} = require('../../middlewares');

const { contacts: ctrl } = require('../../controllers');

const body = validation(model.addContactJoiSchema);
const isFav = validation(model.favoriteJoiSchema);
const isId = wrapper(validateContactId);

const router = Router();

router
  .get('/', auth, wrapper(ctrl.getAll))
  .post('/', auth, body, wrapper(ctrl.add))
  .get('/:id', auth, isId, wrapper(ctrl.getById))
  .put('/:id', auth, isId, body, wrapper(ctrl.updateById))
  .patch('/:id/favorite', auth, isId, isFav, wrapper(ctrl.updateFavorite))
  .delete('/:id', auth, isId, wrapper(ctrl.removeById));

module.exports = router;
