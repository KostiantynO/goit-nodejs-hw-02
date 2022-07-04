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
      maxlength: 40,
      match: [emailRegExp, emailMsg.pattern],
      required: [true, emailMsg.required],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 40,
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
      async setPassword(newPass) {
        this.password = await hash(newPass, await genSalt(10));
      },
      async checkPassword(hashPass) {
        return compare(hashPass, this.password);
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

const addUserJoiSchema = Joi.object({
  email: Joi.string()
    .trim()
    .min(5)
    .max(40)
    .pattern(emailRegExp, 'email')
    .required()
    .messages(joiMessages.email),

  password: Joi.string()
    .trim()
    .min(8)
    .max(40)
    .required()
    .messages(joiMessages.password),

  subscription: Joi.valid(...subscriptionTypes).default('starter'),
  token: Joi.string().default(''),
});

module.exports = {
  User,
  addUserJoiSchema,
};
