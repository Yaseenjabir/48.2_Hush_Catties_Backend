const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { createOrder } = require("../../utils/orderUtils");
const deleteCartByUserId = require("../../utils/deleteCart");
const { Product } = require("../../Models/Product");

module.exports = async function handleWebHook(req, res) {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const {
        id: sessionId,
        payment_intent: paymentIntent,
        amount_total,
        customer_details,
        shipping_details,
        metadata,
      } = session;

      const productsIds = JSON.parse(metadata.products);
      const shippingAddress = shipping_details?.address;

      const userId = metadata.userId;

      // Fetch full product details from the database
      const productDetails = await Promise.all(
        productsIds.map(async (item) => {
          const product = await Product.findById(item._id);
          return {
            productId: item.productId,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: item.quantity,
            images: product.imageUrls,
            color: item.color,
            size: item.size,
          };
        })
      );

      try {
        await createOrder(
          sessionId,
          paymentIntent,
          amount_total,
          {
            email: customer_details.email,
            name: customer_details.name,
            address: shippingAddress,
          },
          productDetails,
          userId,
          shippingAddress
        );
        await deleteCartByUserId(userId);
      } catch (err) {
        console.error("Failed to create order:", err);
        return res.status(500).send("Failed to create order");
      }
      break;
  }

  res.json({ received: true });
};
