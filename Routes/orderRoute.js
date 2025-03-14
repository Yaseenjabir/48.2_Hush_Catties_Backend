const Router = require("express").Router();
const getAllOrders = require("../Controllers/OrderController/getAllOrders");
const getSingleOrder = require("../Controllers/OrderController/getSingleOrder");
const updateStatus = require("../Controllers/OrderController/updateStatus");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");

Router.get("/getAllOrders", asyncMiddleware(getAllOrders));
Router.get("/:id", asyncMiddleware(getSingleOrder));
Router.patch("/updateStatus", asyncMiddleware(updateStatus));

module.exports = Router;
