const { validateUpdatedData, User } = require("../../Models/User");

module.exports = async function updateProfile(req, res) {
  const { error } = validateUpdatedData(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, req.body);

    return res.status(200).send("User updated successfully");
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Internal Server Error");
  }
};
