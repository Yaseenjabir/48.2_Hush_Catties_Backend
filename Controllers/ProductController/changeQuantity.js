const { Cart } = require("../../Models/Cart");

module.exports = async (req, res) => {
  const { productId, action } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Increase or Decrease Quantity
    if (action === "increase") {
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrease") {
      cart.items[itemIndex].quantity = Math.max(
        0,
        cart.items[itemIndex].quantity - 1
      );
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await cart.save();

    res.status(200).json({
      message: "Quantity updated",
      productId, // ✅ Only return updated product ID
      updatedQuantity: cart.items[itemIndex].quantity, // ✅ Return only new quantity
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
