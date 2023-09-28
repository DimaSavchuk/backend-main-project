const { Schema, model } = require("mongoose");
const Joi = require("joi");
const errorMongooseHandler = require("../helpers/errorMongooseHandler");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateBirthDate = (value, helpers) => {
  const currentUnixTime = Date.now();
  const birthDateUnixTime = value.getTime();

  if (birthDateUnixTime > currentUnixTime) {
    return helpers.error("date.future", { v: birthDateUnixTime });
  }
  return value;
};

const userSchema = new Schema(
  {
    name: {
      type: String,

      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscriptionEmail: {
      type: String,
      default: "",
    },
    birthDate: {
      type: Number,
      required: [true, "BirthDate is required"],
    },
    adult: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", errorMongooseHandler);

const registerSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "Name should be a type of string.",
    "string.min":
      "User name should have a minimum length of {#limit} characters.",
    "any.required": "Name is a required field.",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email should be a type of string.",
    "string.pattern.base": "Invalid email format.",
    "any.required": "Email is a required field.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a type of string.",
    "string.min":
      "Password should have a minimum length of {#limit} characters.",
    "any.required": "Password is a required field.",
  }),
  birthDate: Joi.date()
    .timestamp("unix")
    .custom(validateBirthDate, "BirthDate validation")
    .required()
    .messages({
      "date.base": "BirthDate should be a type of date.",
      "date.future": "BirthDate cannot be in the future.",
      "any.required": "BirthDate is a required field.",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email should be a type of string.",
    "string.pattern.base": "Invalid email format.",
    "any.required": "Email is a required field.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a type of string.",
    "string.min":
      "Password should have a minimum length of {#limit} characters.",
    "any.required": "Password is a required field.",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(1).messages({
    "string.base": "Name should be a type of string.",
    "string.min":
      "User name should have a minimum length of {#limit} characters.",
  }),
});

const subscribeEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).messages({
    "string.base": "Email should be a type of string.",
    "string.pattern.base": "Invalid email format.",
  }),
});

const User = model("User", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateUserSchema,
  subscribeEmailSchema,
};
