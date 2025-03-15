const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  paymentIntent: { type: String, required: true, unique: true },
  amountTotal: { type: Number, required: true },
  customerDetails: {
    email: { type: String, required: true },
    name: { type: String },
    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      images: [{ type: String }],
      size: { type: String, required: true },
      color: { type: String, required: true },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  status: { type: String, default: "processing" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
