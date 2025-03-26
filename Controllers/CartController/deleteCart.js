const { Cart } = require("../../Models/Cart");

module.exports = async (req, res) => {
  const { productId } = req.query;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const initialLength = cart.items.length;

    // Check if product exists in cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // If no item was removed, return a 400 response
    if (cart.items.length === initialLength) {
      return res.status(400).json({ error: "Item not found in cart" });
    }

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
