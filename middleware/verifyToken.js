// jwtMiddleware.js
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

function verifyJwtToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { verifyJwtToken };
