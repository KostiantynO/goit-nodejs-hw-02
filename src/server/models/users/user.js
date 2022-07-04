const { Schema, model } = require('mongoose');
const { genSalt, hash, compare } = require('bcryptjs');
const Joi = require('joi');

const emailRegExp = /^\w+@\w+\.\w{1,10}$/;
const emailMsg = {
  pattern: 'Please provide correct email',
  required: 'Email is required',
};
const passMsg = 'Set password for user';
const subscriptionTypes = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 50,
      match: [emailRegExp, emailMsg.pattern],
      required: [true, emailMsg.required],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 100,
      required: [true, passMsg],
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },

  {
    versionKey: false,
    timestamps: true,
    methods: {
      /**
       * @param {string} newPassword - new password
       */
      async setPassword(newPassword) {
        this.password = await hash(newPassword, await genSalt(10));
      },

      /**
       * @param {string} password
       * @returns {Promise<boolean>} Promise<boolean>
       */
      async checkPassword(password) {
        return compare(password, this.password);
      },
    },
  },
);
const User = model('user', userSchema);

const joiMessages = {
  password: { 'any.required': passMsg },
  email: {
    'any.required': emailMsg.required,
    'string.pattern.base': emailMsg.pattern,
  },
};

const email = Joi.string()
  .trim()
  .min(5)
  .max(50)
  .pattern(emailRegExp, 'email')
  .required()
  .messages(joiMessages.email);

const password = Joi.string()
  .trim()
  .min(8)
  .max(100)
  .required()
  .messages(joiMessages.password);

const addUserJoiSchema = Joi.object({
  email,
  password,
  subscription: Joi.valid(...subscriptionTypes).default('starter'),
  token: Joi.string().default(''),
});

const loginJoiSchema = Joi.object({
  email,
  password,
});

module.exports = {
  User,
  addUserJoiSchema,
  loginJoiSchema,
};
