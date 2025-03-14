const { Wishlist } = require("../../Models/Wishlist");
const { Product } = require("../../Models/Product");

// Toggle item in wishlist
module.exports = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find or create the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Check if the product is already in the wishlist
    const itemIndex = wishlist.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    let message = "";

    if (itemIndex === -1) {
      // If the product is not in the wishlist, add it
      wishlist.items.push({ productId });
      message = "Item added to wishlist";
    } else {
      // If the product is already in the wishlist, remove it
      wishlist.items.splice(itemIndex, 1);
      message = "Item removed from wishlist";
    }

    // Save the updated wishlist
    await wishlist.save();

    // Send only the message
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
