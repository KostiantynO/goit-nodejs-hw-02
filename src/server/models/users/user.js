const { Schema, model } = require('mongoose');
const { genSalt, hash, compare } = require('bcryptjs');
const Joi = require('joi');

const emailRegExp = /^\w+@\w+\.\w{1,10}$/;
const emailMsg = {
  pattern: 'Please provide correct email',
  required: 'email is required',
};
const passMsg = 'Set password for user';
const subscriptionTypes = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 64,
      match: [emailRegExp, emailMsg.pattern],
      required: [true, emailMsg.required],
    },

    password: {
      type: String,
      minlength: 8,
      maxlength: 1024,
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

    avatarURL: {
      type: String,
      required: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      required: [true, 'Verification token is required'],
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
  subscription: { 'any.required': `Missing field 'subscription'` },
};

const email = Joi.string()
  .trim()
  .min(5)
  .max(64)
  .pattern(emailRegExp, 'email')
  .required()
  .messages(joiMessages.email);

const password = Joi.string()
  .trim()
  .min(8)
  .max(1024)
  .required()
  .messages(joiMessages.password);

const subscription = Joi.valid(...subscriptionTypes);

const addUserJoiSchema = Joi.object({
  email,
  password,
  subscription: subscription.default('starter'),
  token: Joi.string().default(''),
});

const loginJoiSchema = Joi.object({
  email,
  password,
});

const subscriptionJoiSchema = Joi.object({
  subscription: subscription.required().messages(joiMessages.subscription),
});

const verificationEmailJoiSchema = Joi.object({
  email,
});

module.exports = {
  User,
  addUserJoiSchema,
  verificationEmailJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
};
