const { Cart } = require("../Models/Cart");

module.exports = async function deleteCartByUserId(userId) {
  try {
    // Find and delete the cart associated with the userId
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
      return { success: false, message: "Cart not found" };
    }

    return {
      success: true,
      message: "Cart deleted successfully",
      cart: deletedCart,
    };
  } catch (error) {
    console.error("Error deleting cart:", error);
    return { success: false, message: "Something went wrong" };
  }
};
