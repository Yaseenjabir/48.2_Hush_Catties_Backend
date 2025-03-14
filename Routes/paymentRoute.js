const Router = require("express").Router();
const handlePayment = require("../Controllers/PaymentController/handlePayment");
const handleWebHook = require("../Controllers/PaymentController/webhook");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const bodyParser = require("body-parser");
const { verifyJwtToken } = require("../middleware/verifyToken");

Router.post(
  "/create-payment-intent",
  verifyJwtToken,
  asyncMiddleware(handlePayment)
);
Router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  asyncMiddleware(handleWebHook)
);

module.exports = Router;
