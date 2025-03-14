const Order = require("../../Models/Order");

module.exports = async function updateStatus(req, res) {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    return res.status(200).send("Status changed successfully");
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
