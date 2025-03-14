const { Wishlist } = require("../../Models/Wishlist");

module.exports = async function getWishlist(req, res) {
  try {
    const userId = req.user.userId;

    const wishlist = await Wishlist.find({ userId });
    return res.status(200).send(wishlist);
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
