const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: [
      "Dress",
      "Abaya",
      "Coords",
      "Tops",
      "Jacket",
      "Coat",
      "Kimanos",
      "Cardigans",
    ],
    required: true,
  },
  size: {
    type: [String],
    enum: ["S", "M", "L", "XL", "XXL"],
    required: true,
  },
  color: {
    type: [String],
    required: true,
    enum: ["Red", "Blue", "Green", "Black", "White", "Pink", "Yellow"],
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  tiktokUrl: {
    type: String,
  },
  stock: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

productSchema.index({ category: 1 });

productSchema.index({ createdAt: -1 });

const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(), // Rich text
    price: Joi.number().min(0).required(),
    category: Joi.string()
      .valid(
        "Dress",
        "Abaya",
        "Coords",
        "Tops",
        "Jacket",
        "Coat",
        "Kimanos",
        "Cardigans"
      )
      .required(),
    size: Joi.array()
      .items(Joi.string().valid("S", "M", "L", "XL", "XXL"))
      .min(1)
      .required(),
    tiktokUrl: Joi.string(),
    color: Joi.array()
      .items(
        Joi.string().valid(
          "Red",
          "Blue",
          "Green",
          "Black",
          "White",
          "Pink",
          "Yellow"
        )
      )
      .min(1)
      .required(),
    stock: Joi.boolean().default(true),
    reviews: Joi.array()
      .items(
        Joi.object({
          user: Joi.string().required(),
          rating: Joi.number().min(1).max(5).required(),
          comment: Joi.string().required(),
          createdAt: Joi.date().default(Date.now),
        })
      )
      .default([]),
  });

  return schema.validate(data);
};

module.exports = {
  Product,
  validateProduct,
};
