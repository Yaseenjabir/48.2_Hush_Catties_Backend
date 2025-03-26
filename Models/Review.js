const mongoose = require("mongoose");
const Joi = require("joi");
const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", // Reference to Product model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    required: true,
    type: String,
    minLength: 10,
    maxLength: 50,
  },
  comment: {
    required: true,
    type: String,
    minLength: 10,
    maxLength: 500,
  },
  rating: {
    required: true,
    min: 1,
    max: 5,
    type: Number,
    default: 0,
  },
  likes: {
    required: true,
    type: Number,
    default: 0,
  },
  dislikes: {
    required: true,
    type: Number,
    default: 0,
  },
  isApproved: {
    required: true,
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("reviews", reviewSchema);

const validateReview = function (review) {
  const schema = Joi.object({
    product: Joi.string().required(),
    user: Joi.string().required(),
    title: Joi.string().min(10).max(50).required(),
    comment: Joi.string().min(10).max(500).required(),
    rating: Joi.number().min(1).max(5).required(),
    likes: Joi.number().required(),
    dislikes: Joi.number().required(),
  });

  return schema.validate(review);
};

module.exports = {
  Review,
  validateReview,
};
