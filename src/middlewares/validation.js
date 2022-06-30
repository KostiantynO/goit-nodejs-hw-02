const Joi = require('joi');
const {UNPROCESSABLE_ENTITY} = require('../common/http-codes');
const {createError} = require('../controllers/contacts/responseHelpers');

const rex = /^[+]?\d{0,3}( ?[(]?\d{2,3}[)]?)? ?\d{1,3}([ -]?\d{2,3}){2}$/;
const message = {'any.required': `missing required {{#label}} field`};

const phoneExample = [
  '098xxxxxxx',
  '+380xxxxxxxxx',
  '+380 xx xxx-xx-xx',
  '+38 (xxx) xxx-xxxx',
  '+38 (xxx) x-xxx-xxx',
  '+38 (xxx) x xxx xxx',
];

const phoneMessage = {
  'any.required': `missing required {{#label}} field`,
  'string.pattern.base': `{{#label}} expected formats: ${phoneExample.join(
    ', ',
  )}`,
};

const addContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages(message),

  email: Joi.string()
    .trim()
    .email()
    .min(5)
    .max(30)
    .required()
    .messages(message),

  phone: Joi.string()
    .trim()
    .min(6)
    .max(21)
    .regex(rex)
    .example(phoneExample)
    .required()
    .messages(phoneMessage),
});

const validateAddContact = async (req, res, next) => {
  try {
    const trimmedContact = await addContactSchema.validateAsync(req.body);
    res.locals.newContact = trimmedContact;
    next();
  } catch (error) {
    createError(res, UNPROCESSABLE_ENTITY, error.details[0].message);
  }
};

const validateChangeContact = async (req, res, next) => {
  try {
    const trimmedContact = await addContactSchema.validateAsync(req.body);
    res.locals.contactUpdate = trimmedContact;
    next();
  } catch (error) {
    createError(res, UNPROCESSABLE_ENTITY, error?.details[0].message);
  }
};

module.exports = {
  validateAddContact,
  validateChangeContact,
};
