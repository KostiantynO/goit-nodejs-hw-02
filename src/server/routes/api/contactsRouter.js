const { Router } = require('express');

const {
  addContactJoiSchema,
  favoriteJoiSchema,
} = require('../../models/contacts');
const { validation, validateId, ctrlWrapper } = require('../../middlewares');

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
  .get('/', ctrlWrapper(getAll))
  .post('/', validateBody, ctrlWrapper(add))
  .get('/:id', isId, ctrlWrapper(getById))
  .put('/:id', isId, validateBody, ctrlWrapper(updateById))
  .patch(
    '/:id/favorite',
    isId,
    validateFavorite,
    ctrlWrapper(updateStatusContact),
  )
  .delete('/:id', isId, ctrlWrapper(removeById));

module.exports = router;
