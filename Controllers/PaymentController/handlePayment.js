const Stripe = require("stripe");

module.exports = async function handlePayment(req, res) {
  try {
    const { products } = req.body;
    const userId = req.user.userId;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["PK", "GB"], // Only allow these countries
      },

      line_items: products.map((product) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.description, // 📝 Short description
            images: product.images, // 🖼️ Display product image
          },
          unit_amount: product.price * 100, // Convert to cents
        },
        quantity: product.quantity,
      })),
      metadata: {
        products: JSON.stringify(
          products.map((item) => ({ _id: item._id, quantity: item.quantity }))
        ), // Include products in metadata
        userId, // Include userId in metadata
      },
    });
    return res.json({ id: session.id, url: session.url });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
