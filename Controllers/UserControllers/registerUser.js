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

    const result = await user.save();

    const token = user.generateToken();

    res.cookie("authToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
      sameSite: "strict",
    });

    return res.status(201).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
