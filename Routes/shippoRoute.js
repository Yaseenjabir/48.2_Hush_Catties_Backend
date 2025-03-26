const generateLabel = require("../Controllers/ShippoController/generateLabel");
const getShippingRates = require("../Controllers/ShippoController/getShippingRates");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");

const Router = require("express").Router();

Router.post("/getAllShippingRates", asyncMiddleware(getShippingRates));
Router.post("/generateLabel", asyncMiddleware(generateLabel));

module.exports = Router;
