const Order = require("../../Models/Order");

module.exports = async function getAllOrders(req, res) {
  try {
    const { status } = req.query;
    const orders = await Order.find({ status });
    return res.status(200).send(orders);
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
