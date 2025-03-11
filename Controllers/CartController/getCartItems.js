const { Cart } = require("../../Models/Cart");

module.exports = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
