const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 150,
  },
  userRole: {
    type: String,
    default: "user",
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
});

userSchema.methods.generateToken = function () {
  const payload = {
    userId: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);

  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(150).required(),
  });
  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(150).required(),
  });
  return schema.validate(user);
}

function validateUpdatedData(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(50),
    lastName: Joi.string().min(4).max(50),
    email: Joi.string().email(),
  });
  return schema.validate(user);
}

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
  validateUser,
  validateLogin,
  validateUpdatedData,
};
