const Router = require("express").Router();
const addItemToCart = require("../Controllers/CartController/addToCart");
const deleteCart = require("../Controllers/CartController/deleteCart");
const getCartItems = require("../Controllers/CartController/getCartItems");
const updateCart = require("../Controllers/CartController/updateCart");
const changeQuantity = require("../Controllers/ProductController/changeQuantity");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { verifyJwtToken } = require("../middleware/verifyToken");

Router.post("/addItemToCart", verifyJwtToken, asyncMiddleware(addItemToCart));
Router.get("/getCartItems", verifyJwtToken, asyncMiddleware(getCartItems));
Router.put("/updateCart", verifyJwtToken, asyncMiddleware(updateCart));
Router.delete("/deleteItem", verifyJwtToken, asyncMiddleware(deleteCart));
Router.patch(
  "/changeQuantity",
  verifyJwtToken,
  asyncMiddleware(changeQuantity)
);

module.exports = Router;
