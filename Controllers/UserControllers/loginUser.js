const { User, validateLogin } = require("../../Models/User");

module.exports.loginUser = async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res.status(402).send(error.message);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "Invalid email or password" });
    }

    const token = user.generateToken();

    res.cookie("authToken", token, {
      httpOnly: false,
      secure: true,
      maxAge: 86400000,
      sameSite: "None",
    });

    return res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
