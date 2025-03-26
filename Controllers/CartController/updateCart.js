const { Cart } = require("../../Models/Cart");

module.exports = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // Assuming you are using JWT for authentication

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!cartItem) {
      return res.status(404).json({ error: "Product not in cart" });
    }

    cartItem.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
