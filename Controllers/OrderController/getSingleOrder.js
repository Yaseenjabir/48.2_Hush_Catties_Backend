const Order = require("../../Models/Order");

module.exports = async function getSingleOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id }).populate("userId");
    return res.status(200).send(order);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
