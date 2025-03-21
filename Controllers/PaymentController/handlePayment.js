const Stripe = require("stripe");

module.exports = async function handlePayment(req, res) {
  try {
    const { products, deliveryCharge, shippingAddress } = req.body;

    const userId = req.user.userId;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create line items for products
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
          description: product.description,
          images: product.images,
        },
        unit_amount: product.price * 100, // Convert to cents
      },
      quantity: product.quantity,
    }));

    // Create Stripe Checkout Session with shipping options
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,

      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Standard Shipping (Based on your location)",
            type: "fixed_amount",
            fixed_amount: {
              amount: deliveryCharge * 100, // Convert to cents
              currency: "eur",
            },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      metadata: {
        products: JSON.stringify(
          products.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          }))
        ),
        userId,
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    return res.json({ id: session.id, url: session.url });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
