const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Address model with shipping and billing addresses
const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shippingAddress: {
    street: { type: String, minLength: 5, maxLength: 100 },
    city: { type: String, minLength: 3, maxLength: 50 },
    state: { type: String, minLength: 2, maxLength: 50 },
    postalCode: { type: String, minLength: 5, maxLength: 10 },
    country: { type: String, minLength: 2, maxLength: 50 },
  },
});

const validateAddress = function (address) {
  const schema = Joi.object({
    street: Joi.string().min(5).max(100).required(),
    city: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    postalCode: Joi.string().min(5).max(10).required(),
    country: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(address);
};

// Create the Address model
const Address = mongoose.model("addresses", addressSchema);

module.exports = { validateAddress, Address };
