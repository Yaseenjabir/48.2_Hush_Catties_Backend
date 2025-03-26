const { Product } = require("../../Models/Product");
const { Review } = require("../../Models/Review"); // Make sure to import the Review model

module.exports = async function getSingleProduct(req, res) {
  try {
    const { id } = req.params;

    const result = await Product.findById(id);
    if (!result) {
      return res.status(404).send("Product not found");
    }

    const featuredProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const sameCategoryProducts = await Product.find({
      category: result.category,
      _id: { $ne: id },
    }).limit(5);

    const reviews = await Review.find({ product: id })
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).send({
      product: result,
      featuredProducts,
      sameCategoryProducts,
      reviews,
    });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
