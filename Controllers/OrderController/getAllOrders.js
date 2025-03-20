const Order = require("../../Models/Order");

module.exports = async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
