const { Cart } = require("../../Models/Cart");
const { Product } = require("../../Models/Product");

module.exports = async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  const userId = req.user.userId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size, color });
    }

    await cart.save();

    // Re-populate after saving to return updated data
    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    res.status(200).json({ message: "Item added to cart", cart: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
