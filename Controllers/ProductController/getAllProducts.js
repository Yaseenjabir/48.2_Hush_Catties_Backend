const { Product } = require("../../Models/Product");
const { Review } = require("../../Models/Review");

module.exports = async function (req, res) {
  try {
    const products = await Product.find();

    const populatedProducts = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id }).populate({
          path: "user",
          select: "name email",
        });

        // Attach the populated reviews to the product
        product.reviews = reviews;
        return product;
      })
    );

    res.status(200).send(populatedProducts);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong while fetching products.");
  }
};
