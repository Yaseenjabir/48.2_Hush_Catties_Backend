const createAddress = require("../Controllers/AddressesController/createAddress");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { verifyJwtToken } = require("../middleware/verifyToken");

const Router = require("express").Router();

Router.post("/createAddress", verifyJwtToken, asyncMiddleware(createAddress));

module.exports = Router;
