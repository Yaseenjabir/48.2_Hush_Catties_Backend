const { addProduct } = require("../Controllers/ProductController/addProduct");
const getAllProducts = require("../Controllers/ProductController/getAllProducts");
const getSingleProduct = require("../Controllers/ProductController/getSingleProduct");
const { productParser } = require("../middleware/upload");

const productRouter = require("express").Router();

productRouter.post("/addProduct", productParser.array("images"), addProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getSingleProduct/:id", getSingleProduct);

module.exports = productRouter;
