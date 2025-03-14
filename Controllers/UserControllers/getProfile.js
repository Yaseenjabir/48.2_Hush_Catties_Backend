const { User } = require("../../Models/User");
const { Wishlist } = require("../../Models/Wishlist");
const { Product } = require("../../Models/Product"); // Import the Product model
const Order = require("../../models/Order");

module.exports = async function getProfile(req, res) {
  try {
    const userId = req.user.userId;

    // Find the user and exclude the password field
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("No user found");
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Find the wishlist and populate the productId field with actual product data
    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "items.productId", // Path to populate
      model: "Product", // Model to use for population
    });

    // Find orders for the user
    const orders = await Order.find({ userId });

    res.status(200).send({
      user: userWithoutPassword,
      wishlist: wishlist ? wishlist.items : [], // Send populated wishlist items
      orders,
    });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
