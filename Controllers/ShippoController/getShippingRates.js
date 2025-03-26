const { Shippo } = require("shippo");
const shippo = new Shippo({
  apiKeyHeader: process.env.SHIPPO_API_KEY,
});

module.exports = async function getShippingRates(req, res) {
  try {
    const { addressFrom, addressTo, parcels } = req.body;

    const shipment = await shippo.shipments.create({
      addressFrom,
      addressTo,
      parcels,
    });

    // console.log("shipment : ", shipment);

    return res.status(200).json(shipment.rates);
  } catch (ex) {
    console.log("ex is : ", ex);
    return res.status(500).send("Internal Server Error");
  }
};
