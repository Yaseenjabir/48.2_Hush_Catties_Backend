const { Shippo } = require("shippo");
const shippo = new Shippo({
  apiKeyHeader: process.env.SHIPPO_API_KEY,
});

module.exports = async function generateLabel(req, res) {
  try {
    const { rateId } = req.body;
    if (!rateId) {
      return res.status(400).json({ error: "rateId is required" });
    }

    const transaction = await shippo.transactions.create({
      rate: rateId,
      labelFileType: "PDF",
      async: false,
    });

    console.log("transaction : ", transaction);

    if (transaction.status === "ERROR") {
      return res.status(500).json({ error: transaction });
    }

    return res.status(201).json({
      labelUrl: transaction.labelUrl,
      trackingNumber: transaction.trackingNumber,
    });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
