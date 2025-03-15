// utils/orderUtils.js
const Order = require("../Models/Order");

async function createOrder(
  sessionId,
  paymentIntent,
  amountTotal,
  customerDetails,
  products,
  userId,
  shippingAddress
) {
  try {
    // Check if an order with the same sessionId already exists
    const existingOrder = await Order.findOne({ sessionId });

    if (existingOrder) {
      console.log("Order with the same sessionId already exists:", sessionId);
      return existingOrder; // Return the existing order
    }

    // If no existing order, create a new one
    const order = new Order({
      sessionId,
      paymentIntent,
      amountTotal,
      customerDetails,
      products,
      userId,
      shippingAddress,
    });

    await order.save(); // Save the new order to the database
    console.log("Order saved successfully");
    return order;
  } catch (err) {
    console.error("Failed to save order:", err);
    throw err; // Re-throw the error for handling in the webhook
  }
}

module.exports = { createOrder };
