const { validateProduct, Product } = require("../../Models/Product");

module.exports.addProduct = async function name(req, res) {
  const { error } = validateProduct(req.body);

  let imageUrls = req.files.map((item) => {
    return item.path;
  });

  const rearrangedData = { ...req.body, imageUrls };

  if (error) {
    return res.status(402).send(error.message);
  }

  try {
    const product = new Product(rearrangedData);
    const result = await product.save();

    return res.status(201).send(result);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
