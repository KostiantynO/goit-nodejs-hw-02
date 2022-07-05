const { Router } = require('express');

const {
  addContactJoiSchema,
  favoriteJoiSchema,
} = require('../../models/contacts');
const {
  auth,
  validation,
  validateId,
  ctrlWrapper,
} = require('../../middlewares');

const {
  contacts: {
    getAll,
    getById,
    add,
    updateById,
    updateStatusContact,
    removeById,
  },
} = require('../../controllers');

const validateBody = validation(addContactJoiSchema);
const validateFavorite = validation(favoriteJoiSchema);
const isId = ctrlWrapper(validateId);

const router = Router();

router
  .get('/', auth, ctrlWrapper(getAll))
  .post('/', auth, validateBody, ctrlWrapper(add))
  .get('/:id', auth, isId, ctrlWrapper(getById))
  .put('/:id', auth, isId, validateBody, ctrlWrapper(updateById))
  .patch(
    '/:id/favorite',
    auth,
    isId,
    validateFavorite,
    ctrlWrapper(updateStatusContact),
  )
  .delete('/:id', auth, isId, ctrlWrapper(removeById));

module.exports = router;
