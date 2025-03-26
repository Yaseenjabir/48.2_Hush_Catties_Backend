const { validateUser, User } = require("../../Models/User");
const argon2 = require("argon2");

module.exports.registerUser = async function (req, res) {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(402).send({ error: error.message });
  }

  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(409).send("User already exist");
    }
    const hashedPassword = await argon2.hash(req.body.password);

    const user = new User({ ...req.body, password: hashedPassword });

    await user.save();

    const token = user.generateToken();

    return res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
