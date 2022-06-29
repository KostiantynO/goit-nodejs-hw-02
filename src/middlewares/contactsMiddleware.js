const Joi = require('joi');
const {
  ERROR,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
} = require('../common/http-codes');

const addContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().email().min(5).max(30).required(),
  phone: Joi.string()
    .trim()
    .regex(/^[+]?\d{0,4}[ ]?([(]\d{1,4}[)])?[ ]?\d{1,4}([- ]?\d{1,4}){1,2}/)
    .required(),
}).required();

const validateAddContact = async (req, res, next) => {
  try {
    await addContactSchema.validateAsync(req.body);
  } catch (error) {
    console.log(error);

    return res.status().json({
      status: ERROR,
      code: UNPROCESSABLE_ENTITY,
      message: error?.details?.[0].message ?? error,
    });
  }
  next();
};

// const validatUpdateContact = async (req, res, next) => {
//   try {
//     await addContactSchema.validateAsync(req.body);
//   } catch (error) {
//     console.log(error);
//   }

//   next();
// };

module.exports = {
  validateAddContact,
  // validatUpdateContact,
};
