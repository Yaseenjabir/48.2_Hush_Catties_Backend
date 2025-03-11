const { User } = require("../../Models/User");
const { Address } = require("../../Models/Address");

module.exports = async function getProfile(req, res) {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("No user found");
    }

    // Convert Mongoose document to a plain object and remove the password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Find the user's addresses
    const addresses = await Address.findOne({ user: userId });

    // Send the response
    res.status(200).send({ user: userWithoutPassword, addresses });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
