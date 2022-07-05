const { Schema, model } = require('mongoose');
const Joi = require('joi');

const phoneRegExp =
  /^[+]?\d{0,3}( ?[(]?\d{2,3}[)]?)? ?\d{1,3}([ -]?\d{2,3}){2}$/;

const phoneExample = [
  '098xxxxxxx',
  '+380xxxxxxxxx',
  '+380 xx xxx-xx-xx',
  '+38 (xxx) xxx-xxxx',
  '+38 (xxx) x-xxx-xxx',
  '+38 (xxx) x xxx xxx',
  '(xxx) xxx-xxxx',
].join(', ');

const joiMessage = { 'any.required': 'missing required {{#label}} field' };
const joiNameMessage = { 'any.required': 'Set name for contact' };
const joiFavoriteMessage = { 'any.required': `Missing field 'favorite'` };

const joiPhoneMessage = {
  ...joiMessage,
  'string.pattern.base': `{#label} expected formats: ${phoneExample}`,
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: 2,
      maxlength: 40,
    },
    email: { type: String, minlength: 5, maxlength: 40 },
    phone: {
      type: String,
      match: [
        phoneRegExp,
        `Got {VALUE}, but 'phone' expected formats are: ${phoneExample}`,
      ],
      minlength: 6,
      maxlength: 21,
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },

  { versionKey: false, timestamps: true },
);
const Contact = model('contact', contactSchema);

const favorite = Joi.boolean();

const addContactJoiSchema = Joi.object({
  name: Joi.string().trim().min(2).max(40).required().messages(joiNameMessage),

  email: Joi.string()
    .trim()
    .email()
    .min(5)
    .max(40)
    .default('')
    .messages(joiMessage),

  phone: Joi.string()
    .trim()
    .min(6)
    .max(21)
    .pattern(phoneRegExp, 'phone')
    .default('')
    .messages(joiPhoneMessage),

  favorite: favorite.default(false),

  owner: Joi.string().default(''),
});

const favoriteJoiSchema = Joi.object({
  favorite: favorite.required().messages(joiFavoriteMessage),
});

module.exports = {
  Contact,
  addContactJoiSchema,
  favoriteJoiSchema,
};
