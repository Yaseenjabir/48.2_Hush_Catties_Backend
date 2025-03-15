const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = { Cart };
