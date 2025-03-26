const Order = require("../../Models/Order");

module.exports = async function verifySession(req, res) {
  try {
    const { _id } = req.query;
    const result = await Order.findOne({ sessionId: _id });
    return res.status(200).json({ isVerified: result ? true : false });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
