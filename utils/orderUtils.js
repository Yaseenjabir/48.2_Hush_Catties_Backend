// utils/orderUtils.js
const Order = require("../models/Order");

async function createOrder(
  sessionId,
  paymentIntent,
  amountTotal,
  customerDetails,
  products,
  userId,
  shippingAddress // Add shippingAddress parameter
) {
  try {
    const order = new Order({
      sessionId,
      paymentIntent,
      amountTotal,
      customerDetails,
      products,
      userId,
      shippingAddress, // Save the shipping address
    });

    await order.save(); // Save the order to the database
    console.log("Order saved successfully");
    return order;
  } catch (err) {
    console.error("Failed to save order:", err);
    throw err; // Re-throw the error for handling in the webhook
  }
}

module.exports = { createOrder };
