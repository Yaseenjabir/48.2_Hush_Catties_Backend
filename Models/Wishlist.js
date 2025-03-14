const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User", // Reference to the User collection
    required: true, // userId is required
    unique: true, // Each user can have only one wishlist
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
        ref: "Product", // Reference to the Product collection
        required: true, // productId is required
      },
      addedAt: {
        type: Date, // Timestamp for when the product was added
        default: Date.now, // Automatically set to the current date and time
      },
    },
  ],
});

// Create the Wishlist model
const Wishlist = mongoose.model("wishlists", wishlistSchema);

module.exports = { Wishlist };
