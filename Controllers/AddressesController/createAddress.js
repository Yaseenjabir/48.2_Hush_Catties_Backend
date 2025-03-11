const { Address, validateAddress } = require("../../Models/Address");

module.exports = async function createAddress(req, res) {
  const { error } = validateAddress(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const userId = req.user.userId;
    const { addressType, street, city, state, postalCode, country } = req.body;

    // Find the existing address document for the user
    let address = await Address.findOne({ user: userId });

    if (!address) {
      // If no address document exists, create a new one
      address = new Address({ user: userId });
    }

    // Update the appropriate address field based on the addressType flag
    if (addressType === "shipping") {
      address.shippingAddress = { street, city, state, postalCode, country };
    } else if (addressType === "billing") {
      address.billingAddress = { street, city, state, postalCode, country };
    }

    // Save the updated address document
    const result = await address.save();
    res.status(201).send(result);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Internal Server Error");
  }
};
