const getWishlist = require("../Controllers/WishlistController/getWishlist");
const toggleWishlist = require("../Controllers/WishlistController/toggleWishlist");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { verifyJwtToken } = require("../middleware/verifyToken");

const Router = require("express").Router();

Router.post("/toggleWishlist", verifyJwtToken, asyncMiddleware(toggleWishlist));
Router.get("/getWishlist", verifyJwtToken, asyncMiddleware(getWishlist));

module.exports = Router;
